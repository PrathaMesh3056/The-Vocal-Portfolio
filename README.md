
# The Vocal Portfolio

Welcome to my personal portfolio, reimagined. This project is a complete portfolio website designed to showcase my skills and projects, with one unique feature: **full voice-based navigation.**

You can browse the entire site, from the "About Me" section to my "Projects" and "Contact" page, using only your voice. This project combines a modern React frontend with a powerful Python backend that handles speech-to-text processing and command interpretation.

![A placeholder for a cool demo GIF of your portfolio being navigated by voice](https://via.placeholder.com/720x400.png?text=Demo+of+Voice+Navigation+in+Action)
*(Tip: Replace the link above with a GIF you record of the site working!)*

## ✨ Features

* **Voice-Powered Navigation:** The core feature. Use commands like "Go to projects" or "Open contact" to move around the site.
* **Real-time Feedback:** The UI shows what the application *thinks* you said.
* **Standard Portfolio Sections:** Includes all the essentials:
    * Home / About Me
    * Projects Showcase
    * Resume / Experience
    * Contact Form
* **Responsive Design:** Looks and works great on all devices (voice feature requires microphone access).

## 🚀 Tech Stack

* **Frontend:**
    * [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
    * [Tailwind CSS](https://tailwindcss.com/)
    * Web Speech API for microphone access.
* **Backend:**
    * [Python](https://www.python.org/) (using [Flask](https://flask.palletsprojects.com/) or [FastAPI](https://fastapi.tiangolo.com/))
    * Speech-to-Text library (e.g., `SpeechRecognition`)
* **Development:**
    * Git & GitHub
    * VS Code

## 🛠️ Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (which includes npm)
* [Python 3.8+](https://www.python.org/downloads/)
* [Git](https://git-scm.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/PrathaMesh3056/The-Vocal-Portfolio.git](https://github.com/PrathaMesh3056/The-Vocal-Portfolio.git)
    cd The-Vocal-Portfolio
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend directory
    cd Backend

    # Create a virtual environment
    python -m venv .venv

    # Activate the virtual environment
    # On Windows:
    .\.venv\Scripts\activate
    # On macOS/Linux:
    source .venv/bin/activate

    # Install the required Python packages
    pip install -r requirements.txt

    # Run the backend server
    python server.py
    ```
    The backend server will now be running on `http://127.0.0.1:8000`.

3.  **Set up the Frontend:**
    * Open a **new terminal window**.
    ```bash
    # Navigate to the frontend directory from the root
    cd Frontend

    # Install the required npm packages
    npm install

    # Run the frontend development server
    npm run dev
    ```
    The frontend will now be running on `http://localhost:5173`.

4.  **Open the app!**
    Open `http://localhost:5173` in your browser. You may need to grant the site microphone permissions.

## 🎤 How to Use

Once the application is running, activate the voice listener (e.g., by clicking a microphone button).

### Example Voice Commands

* "Go to Projects"
* "Show me your work"
* "Open About Me"
* "Contact"
* "Scroll down" / "Scroll up"
* "Go back"
=======
My Voice-Directed Portfolio
Welcome to my personal portfolio, reimagined. This project is a complete portfolio website designed to showcase my skills and projects, with one unique feature: full voice-based navigation.

You can browse the entire site, from the "About Me" section to my "Projects" and "Contact" page, using only your voice. This project combines a modern React frontend with a powerful Python backend that handles speech-to-text processing and command interpretation.

(Tip: Replace the link above with a GIF you record of the site working!)

✨ Features
Voice-Powered Navigation: The core feature. Use commands like "Go to projects" or "Open contact" to move around the site.

Real-time Feedback: The UI shows what the application thinks you said.

Standard Portfolio Sections: Includes all the essentials:

Home / About Me

Projects Showcase

Resume / Experience

Contact Form

Responsive Design: Looks and works great on all devices (voice feature requires microphone access).

🚀 Tech Stack
Frontend:

React (with Vite)

Tailwind CSS

Web Speech API (or similar) for microphone access.

Backend:

Python (FastAPI)

Speech-to-Text library (e.g., SpeechRecognition)

Development:

Git & GitHub

VS Code

🛠️ Getting Started
Follow these instructions to get a local copy up and running for development and testing.

Prerequisites
Node.js (which includes npm)

Python 3.8+

Git

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/MyPortfolio.git
cd MyPortfolio
Set up the Backend:

Bash

# Navigate to the backend directory
cd Backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.\.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt

# IMPORTANT: Create your own .env file for API keys or settings
cp .env.example .env 
# (Then edit .env with any necessary keys)

# Run the backend server
python server.py
The backend server will now be running (likely on http://127.0.0.1:8000).

Set up the Frontend:

Open a new terminal window.

Bash

# Navigate to the frontend directory from the root
cd Frontend

# Install the required npm packages
npm install

# Run the frontend development server
npm run dev
The frontend will now be running (likely on http://localhost:5173).

Open the app! Open http://localhost:5173 in your browser. You may need to grant the site microphone permissions.

🎤 How to Use
Once the application is running, activate the voice listener (e.g., by clicking a microphone button or on page load).

Speak clearly into your microphone.

Example Voice Commands
"Go to Projects"

"Show me your work"

"Open About Me"

"Contact"

"Scroll down" / "Scroll up"

"Go back"

🌟 Future Improvements
[ ] Add more robust error handling for voice commands.

[ ] Expand the list of available commands (e.g., "Open first project").

[ ] Add visual feedback for when the application is actively listening.

