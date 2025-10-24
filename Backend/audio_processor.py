from faster_whisper import WhisperModel
import requests
import base64
import io
import mimetypes
# Import your Gemini API key from config
from config import GEMINI_API_KEY

# --- Whisper Model ---
# 
# CRITICAL: Load the model ONCE when the server starts.
# This saves several seconds on every request.
#
print("Loading Whisper 'base' model...")
try:
    whisper_model = WhisperModel("base", device="cpu")
    print("Whisper 'base' model loaded successfully.")
except Exception as e:
    print(f"Error loading Whisper model: {e}")
    whisper_model = None

def transcribe_audio_local(audio_path: str):
    """
    Transcribes audio using the pre-loaded local Whisper model.
    """
    if not whisper_model:
        raise Exception("Whisper model is not loaded.")
        
    segments, _ = whisper_model.transcribe(audio_path)
    text = " ".join([segment.text for segment in segments]).strip()
    return text if text else None

def fallback_to_gemini(audio_path: str):
    """
    Transcribes audio using the Gemini 1.5 Flash API as a fallback.
    This reads the file, base64-encodes it, and sends it as inlineData.
    """
    print("Falling back to Gemini 1.5 Flash for transcription...")
    if not GEMINI_API_KEY:
        print("Gemini API key missing — skipping fallback.")
        return None

    try:
        # 1. Read audio file and encode to base64
        with open(audio_path, "rb") as audio_file:
            audio_bytes = audio_file.read()
        encoded_audio = base64.b64encode(audio_bytes).decode('utf-8')
        
        # 2. Guess the MIME type
        mime_type = mimetypes.guess_type(audio_path)[0] or "audio/wav"

        # 3. Set up the API request
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        
        # 4. Create the JSON payload
        # We ask Gemini to act as a transcription service
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": "Transcribe this audio file accurately."},
                        {
                            "inlineData": {
                                "mimeType": mime_type,
                                "data": encoded_audio
                            }
                        }
                    ]
                }
            ]
        }
        
        # 5. Make the request
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status() # Raise an error for bad responses (4xx, 5xx)

        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        return text.strip() if text else None

    except Exception as e:
        print(f"Gemini fallback failed: {e}")
        # Print response body if available, for debugging
        if 'response' in locals():
            print(f"Gemini Response Body: {response.text}")
        return None
