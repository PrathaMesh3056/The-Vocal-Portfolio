import os
from dotenv import load_dotenv
load_dotenv()

GMAIL_EMAIL = os.getenv("GMAIL_EMAIL")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
TO_EMAIL = os.getenv("TO_EMAIL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


UPLOAD_FOLDER = "uploads"
CORS_ORIGINS = [
    "http://localhost:5173",  
    "http://your-frontend-domain.com"
]


VALID_COMMANDS = [
    "open home",
    "open about",
    "open projects",
    "open resume",
    "open contact",
    "open github",
]

CONFIDENCE_THRESHOLD = 0
