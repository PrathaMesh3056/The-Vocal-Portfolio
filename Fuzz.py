from thefuzz import process,fuzz

valid_commands = [
     "open resume",
     "open about",
     "open contact",
     "open project",
     "open github",
     "open linkedin"
]
# 2. A messy transcription (what Whisper might hear)
messy_input = "opn projectss"

# 3. Find the single best match from your list
#    extractOne() returns a tuple: (best_match_string, confidence_score)
best_match, score = process.extractOne(messy_input, valid_commands,scorer=fuzz.token_set_ratio)
if score >= 60:
    print(f"Interpreted Command: '{best_match}' with confidence {score}")
print(f"Original Input: '{messy_input}'")
print(f"   Best Match: '{best_match}'")
print(f"   Score (0-100): {score}")

print("---")

# --- Another example ---
messy_input_2 = "show me your project"
best_match_2, score_2 = process.extractOne(messy_input_2, valid_commands)

print(f"Original Input: '{messy_input_2}'")
print(f"   Best Match: '{best_match_2}'")
print(f"   Score (0-100): {score_2}")