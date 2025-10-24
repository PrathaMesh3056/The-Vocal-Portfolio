

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

# Import settings from your config file
from config import CORS_ORIGINS

# Import your refactored functions
from utils import save_audio_file
from audio_processor import transcribe_audio_local, fallback_to_gemini
from command_parser import get_best_command
from notifications import send_email

# --- FastAPI App Setup ---
app = FastAPI()
app.add_middleware( 
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Voice Portfolio API"}


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...), name: str = Form(...)):
    
    # 1. Save the uploaded audio file
    audio_path = save_audio_file(name, file)
    if not audio_path:
        raise HTTPException(status_code=500, detail="Could not save audio file.")

    # 2. Transcribe the audio
    transcribed_text = None
    try:
        
        transcribed_text = transcribe_audio_local(audio_path)
    except Exception as e:
        print(f"Local transcription failed: {e}")

    
    if not transcribed_text:
        transcribed_text = fallback_to_gemini(audio_path)
    
    if not transcribed_text:
        raise HTTPException(status_code=500, detail="Audio transcription failed.")

   
    response = get_best_command(transcribed_text)
    
    # If no match, create a default "unknown" response
    if not response:
        response = {
            "action": "unknown",
            "section": "unknown",
            "greetings": f"Sorry, I heard '{transcribed_text}' but didn't understand."
        }
    
    # 4. Add additional info to the response
    response["transcribed_text"] = transcribed_text
    response["saved_file"] = audio_path

    # 5. Send notification email (this runs in the background)
    send_email(
        event_type=response.get("section", "unknown"), 
        message=transcribed_text, 
        name=name
    )

    return response
