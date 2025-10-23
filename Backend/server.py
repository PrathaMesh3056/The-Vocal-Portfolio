# main.py

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
from datetime import datetime
import shutil
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import pyttsx3
import requests
import io

load_dotenv()
GMAIL_EMAIL = os.getenv("GMAIL_EMAIL")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
TO_EMAIL = os.getenv("TO_EMAIL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # ✅ Added Gemini key

app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://your-frontend-domain.com"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Folders and timestamp setup
# -------------------------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
now = datetime.now()
human_readable_timestamp = now.strftime("%Y-%m-%d_%H-%M-%S")

# -------------------------------
# Function to interpret voice commands
# -------------------------------
def interpret_command(text: str):
    text = text.lower()
    greetings = ""
    if "project" in text:
        greetings = "Opening your Projects section..."
        section = "project"
    elif "resume" in text or "cv" in text:
        greetings = "Showing your Resume..."
        section = "resume"
    elif "contact" in text:
        greetings = "Navigating to Contact section..."
        section = "contact"
    elif "about" in text:
        greetings = "Here is the About section..."
        section = "about"
    else:
        greetings = f"Sorry, could not recognise command: '{text}'"
        section = "unknown"
    return {
        "action": "open_section" if section != "unknown" else "unknown",
        "section": section,
        "greetings": greetings
    }

# -------------------------------
# Function to send email notifications
# -------------------------------
def send_email(event_type: str, message: str, name: str):
    try:
        body = f"""
        Hello!

        Event: {event_type} by {name}
        Message: {message}
        Time: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        """
        msg = MIMEText(body)
        msg["Subject"] = f"{name} opened: {event_type}"
        msg["From"] = GMAIL_EMAIL
        msg["To"] = TO_EMAIL

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_EMAIL, GMAIL_APP_PASSWORD)
            server.send_message(msg)

        print(f"Notification email sent for event: {event_type}")
    except Exception as e:
        print(f"Error sending email: {e}")

# -------------------------------
# Function for Text-to-Speech (optional local feedback)
# -------------------------------
def speak_text(text: str):
    engine = pyttsx3.init()
    engine.setProperty("rate", 150)
    engine.setProperty("volume", 1.0)
    engine.say(text)
    engine.runAndWait()

# -------------------------------
# Gemini Fallback Function
# -------------------------------
def fallback_to_gemini(audio_bytes: bytes):
    try:
        if not GEMINI_API_KEY:
            print("Gemini API key missing — skipping fallback.")
            return None

        headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
        files = {"file": ("audio.wav", audio_bytes, "audio/wav")}

        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            headers=headers,
            files=files,
        )

        data = response.json()
        text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        return text.strip() if text else None

    except Exception as e:
        print("Gemini fallback failed:", e)
        return None

# -------------------------------
# Transcription endpoint with fallback
# -------------------------------
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...), name: str = Form(...)):
    model = WhisperModel("tiny", device="cpu")
    user_folder = os.path.join(UPLOAD_FOLDER, name)
    os.makedirs(user_folder, exist_ok=True)

    import time
    timestamp = int(time.time())
    audio_path = os.path.join(user_folder, f"{name}_{human_readable_timestamp}_{file.filename}")

    # Save uploaded audio
    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Try main local transcription
    try:
        segments, _ = model.transcribe(audio_path)
        text = " ".join([segment.text for segment in segments]).strip()
        if not text:
            raise Exception("Empty transcription result")
    except Exception as e:
        print(f"Local transcription failed: {e}")
        with open(audio_path, "rb") as audio_file:
            audio_bytes = audio_file.read()
        text = fallback_to_gemini(audio_bytes) or "Could not transcribe audio."

    # Interpret command and prepare greetings
    response = interpret_command(text)
    response["transcribed_text"] = text
    response["saved_file"] = audio_path

    # Send email notification
    send_email(event_type=response.get("section", "unknown"), message=text, name=name)

    return response

# -------------------------------
# Root endpoint
# -------------------------------
@app.get("/")
async def root():
    return {"message": "Welcome to the Speech-to-Text API"}
