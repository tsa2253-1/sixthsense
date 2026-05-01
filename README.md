# SixthSense
### Extending Human Perception for Individuals with Hearing and Vision Disabilities

> *Your computer is your Sixth Sense.*

Humans evolved five senses to navigate the world. For millions of people, one or more of those senses presents a barrier. SixthSense turns any device into an extension of human perception — converting sound to text, text to speech, images to readable content, and silence to vibration. Free, private, and accessible to all.

---

## Quick Start

**Requirements:** Python 3.8+, Chrome or Edge browser

```cmd
git clone https://github.com/tsa2253-1/sixthsense.git
cd sixthsense
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```

Then open **Chrome** and go to `http://127.0.0.1:5000`

> Mac/Linux: use `source venv/bin/activate` instead of the activate.bat line

---

## Project Structure

```
sixthsense/
├── app.py                    # Flask backend — all routes documented
├── requirements.txt          # Flask + Gunicorn
├── static/
│   ├── css/
│   │   └── main.css          # Full design system, WCAG AA colour tokens
│   └── js/
│       └── settings.js       # Global accessibility utility (SS object)
└── templates/
    ├── base.html             # Shared layout — skip link, ARIA landmarks, live regions
    ├── index.html            # Home page
    ├── caption.html          # SpeakAssist
    ├── read.html             # ReadAssist
    ├── vision.html           # VisionAssist
    ├── alerts.html           # AdvancedAlert
    ├── settings.html         # Accessibility Control Panel
    └── about.html            # Mission, impact, WCAG compliance
```

---

## Features

### 🎤 SpeakAssist — Real-Time Speech Captions
Converts live speech into on-screen captions in real time using the browser's built-in Web Speech API. Designed for deaf and hard-of-hearing users who need to follow conversations, lectures, or meetings without a sign-language interpreter.
- Continuous real-time captioning with interim word display
- Adjustable font size and colour modes (Default / High Contrast / Dark)
- Optional speaker labelling
- 7 language options
- Vibration pulse on speech detection
- Copy captions to clipboard

### 📖 ReadAssist — Accessible Text Transformation
Accepts any pasted or typed text and transforms it into a more accessible format, then reads it aloud. Designed for users with low vision, dyslexia, or reading fatigue.
- Display modes: Default / High Contrast / Dyslexia Friendly
- Adjustable font size (12–48px) and line spacing
- Full text-to-speech with selectable voice, speed (0.5–2×), and pitch
- Pause, resume, and stop controls
- Sample texts included for quick demo

### 🖼️ VisionAssist — Image Text Reader (OCR)
Extracts printed text from any uploaded photo using Tesseract.js — a real OCR engine running entirely in the browser. No image data is ever sent to a server. Designed for blind and low-vision users who cannot read printed materials.
- Drag-and-drop or click-to-upload image input
- Image preprocessing (greyscale + binary threshold) for maximum accuracy
- Extracted text fed directly into the same display and TTS pipeline as ReadAssist
- Works on book pages, signs, handouts, menus, labels

### 🔔 AdvancedAlert — Multimodal Emergency Notifications
Delivers alerts through four simultaneous channels so no user is left unreached. Designed for deaf, blind, and all users in emergency situations where a single-channel alert (sound-only alarm) would fail.
- **Screen flash** — colour overlay (capped at 3 flashes per WCAG 2.3.1)
- **Vibration** — SOS haptic pattern via device motor (Android)
- **Spoken audio** — TTS reads the alert message aloud
- **Text banner** — on-screen message with dismiss button
- Each channel independently toggleable
- Emergency and general notification types
- Custom message sender

### ⚙️ Accessibility Control Panel
A central dashboard for personalising the entire SixthSense experience. All preferences are saved in browser localStorage — nothing is transmitted to any server.
- Base font size (12–36px)
- Colour theme: Dark (default) / Light / High Contrast
- Font style: Default / Dyslexia Friendly
- TTS speed and pitch defaults
- Output channel toggles
- One-click reset to defaults

---

## Accessibility Compliance (WCAG 2.1 AA)

| Criterion | Implementation |
|-----------|---------------|
| Keyboard navigation | All interactive elements reachable via Tab; custom focus rings |
| Screen reader support | ARIA landmarks, `aria-live`, `aria-label`, `aria-pressed` throughout |
| Colour contrast | All text/background pairs verified ≥ 4.5:1 |
| Focus indicators | 3px amber ring, never hidden for keyboard users |
| Seizure safety | Flash ≤ 3/sec (WCAG 2.3.1); `prefers-reduced-motion` respected |
| Heading structure | Proper h1→h4 hierarchy on every page |
| Touch targets | 48px minimum height on all buttons |
| Skip link | First focusable element on every page |

---

## Privacy

- Zero personal data collected or stored
- Zero advertisements
- Zero analytics or tracking
- All preferences saved in browser `localStorage` only
- No login or account required
- OCR runs entirely client-side — no images sent to any server

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.8+ / Flask 3.x |
| Frontend | HTML5 / CSS3 / Vanilla JavaScript |
| Icons | Bootstrap Icons 1.11 |
| Fonts | Syne + DM Sans + JetBrains Mono |
| Speech input | Web Speech API — SpeechRecognition |
| Speech output | Web Speech API — SpeechSynthesis |
| OCR | Tesseract.js 5 (client-side) |
| Haptics | Vibration API |
| Persistence | localStorage |
| Deployment | Gunicorn-compatible |

---

*Built with empathy. Designed for everyone.*
