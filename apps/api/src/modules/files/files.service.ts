import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private bucket: string;
  private cdnUrl: string;

  constructor(private config: ConfigService) {
    const endpoint = config.get<string>('spaces.endpoint');
    this.bucket = config.get<string>('spaces.bucket', 'sunnova-media');
    this.cdnUrl = config.get<string>('spaces.cdnUrl', '');

    this.s3 = new S3Client({
      region: 'us-east-1',
      endpoint,
      credentials: {
        accessKeyId: config.get<string>('spaces.accessKey', ''),
        secretAccessKey: config.get<string>('spaces.secretKey', ''),
      },
      forcePathStyle: false,
    });
  }

  async upload(buffer: Buffer, originalName: string, mimeType: string, folder = 'uploads'): Promise<string> {
    const ext = originalName.split('.').pop();
    const key = `${folder}/${uuidv4()}.${ext}`;
    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      ACL: 'public-read',
    }));
    return this.cdnUrl ? `${this.cdnUrl}/${key}` : `https://${this.bucket}.${this.config.get('spaces.endpoint')}/${key}`;
  }

  async delete(key: string) {
    await this.s3.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  async getSignedUrl(key: string, expiresIn = 3600) {
    return getSignedUrl(this.s3, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn });
  }
}
