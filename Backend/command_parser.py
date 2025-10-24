from thefuzz import process, fuzz
from config import VALID_COMMANDS, CONFIDENCE_THRESHOLD

def get_best_command(transcription: str):
    
    try:
        current_input = transcription.strip().lower()
        
        best_match, score = process.extractOne(
            current_input, 
            VALID_COMMANDS, 
            scorer=fuzz.token_set_ratio 
        )

        print(f"Fuzzy Match: Input='{current_input}', Match='{best_match}', Score={score}")

        if score >= CONFIDENCE_THRESHOLD:
            
            return {
                "action": "open_section",
                "section": best_match.replace("open ", ""), 
                "greetings": f"Opening {best_match.replace('open ', '')}..."
            }
        else:
            return None

    except Exception as e:
        print(f"Error in command parser: {e}")
        return None
