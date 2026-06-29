"""
Sunnova Medical Supplies — Flask application entry point.

Run locally with:
    python app.py
Then visit http://127.0.0.1:5000/
"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    """Render the homepage.

    All section partials (header / footer) are pulled in from within
    index.html via Jinja2 {% include %} tags, so this route only needs
    to render the single top-level template.
    """
    return render_template("index.html")


@app.route("/why-us")
def why_us():
    """Render the 'Why Us' page."""
    return render_template("why-us.html")


@app.route("/services-and-catalog")
def services_and_catalog():
    """Render the 'Products and Services' (services & catalog) page."""
    return render_template("service-and-catalog.html")


@app.route("/product")
def product():
    """Render a product detail page."""
    return render_template("product.html")


@app.route("/how-to-order")
def how_to_order():
    """Render the 'How to Order' page."""
    return render_template("how-to-order.html")


@app.route("/contact")
def contact():
    """Render the 'Contact' page."""
    return render_template("contact.html")


if __name__ == "__main__":
    # debug=True enables auto-reload while developing.
    app.run(debug=True)
