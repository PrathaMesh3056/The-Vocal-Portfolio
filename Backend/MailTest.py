import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()

GMAIL_EMAIL = os.getenv("GMAIL_EMAIL")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
TO_EMAIL = os.getenv("TO_EMAIL")

event_type = "Test Email Event"  # Example event
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Body text with event info
body = f"""
Hello!

This is a test email sent from your Python script.

Event: {event_type}
Time: {timestamp}

Thank you!
"""

msg = MIMEText(body)
msg["Subject"] = "Test Email"

msg["From"] = GMAIL_EMAIL
msg["To"] = TO_EMAIL

try:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_EMAIL, GMAIL_APP_PASSWORD)
        server.send_message(msg)
    print("Email sent successfully!")
except Exception as e:
    print(e)
