import json
import os
import argparse
import time

def load_chapter_data(json_path, max_shlokas=15):
    """
    Loads chapter data and limits to max_shlokas to prevent OOM 
    and context window explosion during summarization.
    """
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find {json_path}")
        return []

    # Adapt based on the actual JSON structure (assuming a list of verses here)
    verses = data.get("verses", data.get("shlokas", []))
    
    # Enforce memory constraints by limiting the number of shlokas
    if len(verses) > max_shlokas:
        print(f"[Memory Constraint] Chapter has {len(verses)} shlokas. Limiting to first {max_shlokas}.")
        verses = verses[:max_shlokas]
        
    return verses

def format_prompt(verses):
    """
    Formats the verses into a prompt for the LLM.
    """
    text_to_summarize = ""
    for v in verses:
        # Fallbacks for different possible JSON keys
        verse_num = v.get("verse_number", v.get("id", "?"))
        translation = v.get("translation", v.get("meaning", v.get("text", "")))
        if translation:
            text_to_summarize += f"Verse {verse_num}: {translation}\n"

    # Using a generic instruction-following prompt format (compatible with many models)
    prompt = (
        "You are an expert scholar of the Bhagavad Gita and ancient texts.\n"
        "Please provide a concise, insightful summary of the following verses:\n\n"
        f"{text_to_summarize}\n"
        "Summary:"
    )
    return prompt

def summarize_with_llamacpp(prompt, model_path="models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"):
    """
    Uses LLaMA.cpp (via llama-cpp-python) for fast, low-RAM CPU inference.
    """
    try:
        from llama_cpp import Llama
    except ImportError:
        return "Error: llama-cpp-python not installed. Run: pip install llama-cpp-python"

    if not os.path.exists(model_path):
        return f"Error: Model not found at {model_path}. Please download a .gguf model."

    print(f"Loading GGUF model from {model_path} into memory...")
    # n_ctx=2048 is generally sufficient for 15 shlokas + prompt + summary
    llm = Llama(
        model_path=model_path,
        n_ctx=2048,   
        n_threads=4,  # Adjust based on available CPU cores
        verbose=False # Set to True for debugging
    )

    print("Generating summary (this may take a moment on CPU)...")
    start_time = time.time()
    
    # Format according to ChatML or standard prompt structure depending on the specific model
    output = llm(
        prompt,
        max_tokens=256,
        temperature=0.3,
        top_p=0.9,
        echo=False
    )
    
    elapsed = time.time() - start_time
    print(f"Generation took {elapsed:.2f} seconds.")
    
    return output["choices"][0]["text"].strip()

def summarize_with_airllm(prompt, model_repo="meta-llama/Meta-Llama-3-8B-Instruct"):
    """
    Uses AirLLM to run larger models (like 8B or 70B) on low-RAM machines 
    by performing layer-by-layer inference.
    """
    try:
        from airllm import AutoModel
    except ImportError:
        return "Error: airllm not installed. Run: pip install airllm"

    print(f"Initializing AirLLM with {model_repo} (loads layer-by-layer to save RAM)...")
    # AirLLM automatically handles memory paging
    model = AutoModel.from_pretrained(model_repo)

    # Simplified inference logic for AirLLM
    # Note: AirLLM inference usage can vary; refer to their latest docs.
    input_text = [prompt]
    # In a real implementation, you would tokenize and generate using AirLLM's specific generate method
    # e.g., output = model.generate(input_ids)
    
    return "AirLLM integration placeholder: Requires model weights to be downloaded (~15GB)."

def generate_sample_json(json_path):
    """Creates a dummy sample JSON if none exists."""
    if not os.path.exists(json_path):
        print(f"Creating dummy sample JSON at {json_path} for testing.")
        sample_data = {
            "chapter": 1,
            "verses": [
                {"verse_number": 1, "translation": "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do, when they gathered on the sacred field of Kurukshetra, eager for battle?"},
                {"verse_number": 2, "translation": "Sanjaya said: Having seen the army of the Pandavas drawn up in battle array, King Duryodhana approached his teacher Drona and spoke these words."}
            ]
        }
        os.makedirs(os.path.dirname(os.path.abspath(json_path)), exist_ok=True)
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(sample_data, f, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Low-RAM Local LLM Summarizer PoC")
    parser.add_argument("--json", type=str, default="data/sample_chapter.json", help="Path to chapter JSON")
    parser.add_argument("--backend", type=str, choices=['llamacpp', 'airllm'], default='llamacpp', help="Which backend to use")
    parser.add_argument("--model", type=str, default="models/model.gguf", help="Path to model or HuggingFace repo")
    args = parser.parse_args()
    
    generate_sample_json(args.json)
    
    # 1. Load Data (with Memory Constraint limit)
    verses = load_chapter_data(args.json, max_shlokas=15)
    
    if not verses:
        print("No verses found to summarize.")
        exit(1)
        
    # 2. Format Prompt
    prompt = format_prompt(verses)
    
    # 3. Summarize using selected backend
    print("\n--- STARTING SUMMARIZATION ---")
    if args.backend == 'llamacpp':
        summary = summarize_with_llamacpp(prompt, model_path=args.model)
    else:
        summary = summarize_with_airllm(prompt, model_repo=args.model)
        
    print("\n--- SUMMARY RESULT ---")
    print(summary)
