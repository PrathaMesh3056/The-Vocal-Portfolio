import smtplib
from email.mime.text import MIMEText
from datetime import datetime
from config import GMAIL_EMAIL, GMAIL_APP_PASSWORD, TO_EMAIL

def send_email(event_type: str, message: str, name: str):
    
    if not (GMAIL_EMAIL and GMAIL_APP_PASSWORD and TO_EMAIL):
        print("Email credentials not set. Skipping email notification.")
        return

    try:
        body = f"""
        Hello!

        Event: {event_type} by {name}
        Message: {message}
        Time: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        """
        msg = MIMEText(body)
        msg["Subject"] = f"{name} triggered: {event_type}"
        msg["From"] = GMAIL_EMAIL
        msg["To"] = TO_EMAIL

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_EMAIL, GMAIL_APP_PASSWORD)
            server.send_message(msg)

        print(f"Notification email sent for event: {event_type}")
    except Exception as e:
        print(f"Error sending email: {e}")
