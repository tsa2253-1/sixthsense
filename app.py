"""
SixthSense – Accessibility Web Application
==========================================
Extends human perception for users with hearing and vision disabilities.
Built with Flask (Python), vanilla JS, and browser-native APIs.

Routes
------
GET /          Home — mission statement & feature overview
GET /caption   SpeakAssist — real-time speech-to-text captioning
GET /read      ReadAssist  — accessible text transformation & TTS
GET /vision    VisionAssist — camera-based object & text recognition
GET /alerts    AdvancedAlert — multimodal emergency notifications
GET /settings  Accessibility Control Panel
GET /about     Impact, ethics & WCAG compliance statement

Coding Standards
----------------
- PEP 8 throughout
- Every route documented with docstring
- Accessibility decisions annotated with [A11Y]
- No personal data stored; session key is ephemeral random bytes
"""

import os
from flask import Flask, render_template

# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------
app = Flask(__name__)

# [A11Y] Session used only for preference caching — no PII ever stored.
# Secret key is regenerated each restart; sessions are not persisted.
app.secret_key = os.urandom(24)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    """Home page: SixthSense mission, feature cards, stats."""
    return render_template("index.html")


@app.route("/caption")
def caption():
    """
    SpeakAssist — Feature 1.
    Real-time speech-to-text captioning via the Web Speech API.
    Audience: deaf and hard-of-hearing users.
    """
    return render_template("caption.html")


@app.route("/read")
def read():
    """
    ReadAssist — Feature 2.
    Accessible text transformation (large-print, high-contrast, dyslexia)
    plus text-to-speech via SpeechSynthesis API.
    Audience: vision-impaired and users with reading difficulties.
    """
    return render_template("read.html")


@app.route("/vision")
def vision():
    """
    VisionAssist — Feature 3.
    Camera feed with simulated object/OCR detection and spoken feedback.
    Audience: blind and low-vision users.
    TODO: Replace simulation with Tesseract.js or Vision API call.
    """
    return render_template("vision.html")


@app.route("/alerts")
def alerts():
    """
    AdvancedAlert — Feature 4.
    Multimodal alerts: screen flash (≤3 flashes/sec per WCAG 2.3.1),
    vibration, text banner, and spoken TTS announcement.
    Audience: deaf, blind, and all users.
    """
    return render_template("alerts.html")


@app.route("/settings")
def settings():
    """
    Accessibility Control Panel — Feature 5.
    Font size, colour theme, TTS defaults, output channel toggles.
    All preferences persisted in browser localStorage only.
    """
    return render_template("settings.html")


@app.route("/about")
def about():
    """
    About SixthSense.
    Real-world impact, ethical design statement, WCAG 2.1 AA compliance.
    """
    return render_template("about.html")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    # Debug mode enabled for local development only.
    # Use gunicorn for production: gunicorn -w 4 -b 0.0.0.0:8000 app:app
    app.run(debug=True)
