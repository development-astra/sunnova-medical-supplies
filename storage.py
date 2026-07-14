"""
File storage abstraction for the admin upload manager.

The spec requires: store file *metadata* in Postgres, store the actual *files* in
DigitalOcean Spaces, and never on the VPS. This module keeps that contract behind
a small interface so the routes never care where bytes live:

- In production, set the SPACES_* env vars and files go to DigitalOcean Spaces
  (S3-compatible) with a CDN URL returned for the metadata row.
- For local development (no Spaces credentials), a LocalStorage fallback writes
  under static/uploads so the feature is fully runnable. Swap in Spaces for prod.

Only the returned public URL + storage key are persisted; the bytes are never in
the database.
"""

import os
import uuid

from werkzeug.utils import secure_filename

ALLOWED_EXT = {"png", "jpg", "jpeg", "webp", "gif", "pdf"}
IMAGE_EXT = {"png", "jpg", "jpeg", "webp", "gif"}
MAX_BYTES = 5 * 1024 * 1024  # 5 MB


def ext_of(filename):
    return filename.rsplit(".", 1)[-1].lower() if "." in filename else ""


def is_allowed(filename):
    return ext_of(filename) in ALLOWED_EXT


def is_image(filename):
    return ext_of(filename) in IMAGE_EXT


def unique_name(filename):
    """A collision-resistant, safe object name preserving the original name."""
    safe = secure_filename(filename) or "file"
    return f"{uuid.uuid4().hex[:8]}-{safe}"


class LocalStorage:
    """Dev fallback: writes under static/uploads and serves via the app's /static route."""

    kind = "local"

    def __init__(self, root, base_url):
        self.root = root
        self.base_url = base_url.rstrip("/")

    def save(self, folder, filename, data):
        dest_dir = os.path.join(self.root, folder)
        os.makedirs(dest_dir, exist_ok=True)
        name = unique_name(filename)
        key = f"{folder}/{name}"
        with open(os.path.join(self.root, folder, name), "wb") as fh:
            fh.write(data)
        return key, f"{self.base_url}/{key}"

    def delete(self, key):
        if not key:
            return
        path = os.path.join(self.root, *key.split("/"))
        if os.path.exists(path):
            os.remove(path)


class SpacesStorage:
    """Production: DigitalOcean Spaces (S3-compatible) via boto3."""

    kind = "spaces"

    def __init__(self, key_id, secret, bucket, region, endpoint, cdn):
        import boto3  # imported lazily so local dev never needs boto3

        self.bucket = bucket
        self.cdn = (cdn or endpoint).rstrip("/")
        self.client = boto3.client(
            "s3", region_name=region, endpoint_url=endpoint,
            aws_access_key_id=key_id, aws_secret_access_key=secret,
        )

    def save(self, folder, filename, data):
        name = unique_name(filename)
        key = f"{folder}/{name}"
        content_type = _content_type(filename)
        self.client.put_object(
            Bucket=self.bucket, Key=key, Body=data,
            ACL="public-read", ContentType=content_type,
        )
        return key, f"{self.cdn}/{key}"

    def delete(self, key):
        if key:
            self.client.delete_object(Bucket=self.bucket, Key=key)


def _content_type(filename):
    e = ext_of(filename)
    return {
        "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
        "webp": "image/webp", "gif": "image/gif", "pdf": "application/pdf",
    }.get(e, "application/octet-stream")


def get_storage(app):
    """Choose the backend from the environment (Spaces if configured, else local)."""
    if os.environ.get("SPACES_KEY"):
        return SpacesStorage(
            key_id=os.environ["SPACES_KEY"],
            secret=os.environ.get("SPACES_SECRET", ""),
            bucket=os.environ.get("SPACES_BUCKET", "sunnova-media"),
            region=os.environ.get("SPACES_REGION", "nyc3"),
            endpoint=os.environ.get("SPACES_ENDPOINT", "https://nyc3.digitaloceanspaces.com"),
            cdn=os.environ.get("SPACES_CDN"),
        )
    return LocalStorage(
        root=os.path.join(app.static_folder, "uploads"),
        base_url=app.static_url_path + "/uploads",
    )
