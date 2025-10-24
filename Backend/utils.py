import os
import shutil
from datetime import datetime
import pyttsx3
from fastapi import UploadFile
# Import settings from your config file
from config import UPLOAD_FOLDER

def save_audio_file(name: str, file: UploadFile):
    

    try:
        
        now = datetime.now()
        timestamp = now.strftime("%Y-%m-%d_%H-%M-%S")
        
        
        user_folder = os.path.join(UPLOAD_FOLDER, name)
        os.makedirs(user_folder, exist_ok=True)
        
        
        safe_filename = file.filename or "audio.wav"
        audio_path = os.path.join(user_folder, f"{name}_{timestamp}_{safe_filename}")

        
        with open(audio_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return audio_path
        
    except Exception as e:
        print(f"Error saving file: {e}")
        return None


def speak_text(text: str):
    """
    Uses pyttsx3 to speak text (runs on the server).
    """
    try:
        engine = pyttsx3.init()
        engine.setProperty("rate", 150)
        engine.setProperty("volume", 1.0)
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        print(f"Error in pyttsx3: {e}")
