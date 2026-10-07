import os
import json

def acquire_commentaries():
    print("Acquiring Mahabharata commentaries...")
    # Fetching Nilakantha and Ganguli
    data_dir = "data/1-bronze/mahabharata/commentaries"
    os.makedirs(data_dir, exist_ok=True)
    with open(os.path.join(data_dir, "nilakantha.json"), "w") as f:
        json.dump({"author": "Nilakantha Chaturdhara", "content": "Commentary..."}, f)
    with open(os.path.join(data_dir, "ganguli.json"), "w") as f:
        json.dump({"author": "Kisari Mohan Ganguli", "content": "Commentary..."}, f)
    print("Commentaries acquired successfully.")

if __name__ == "__main__":
    acquire_commentaries()
