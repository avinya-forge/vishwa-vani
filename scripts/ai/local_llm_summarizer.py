import json
import os
import time
import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn

app = FastAPI(title="Local LLM Summarizer API")

# Global variables for Queue and Model
request_queue = asyncio.Queue()
global_llm = None
MODEL_PATH = os.getenv("LLM_MODEL_PATH", "models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf")

class SummarizeRequest(BaseModel):
    verses: List[Dict[str, Any]]
    backend: str = "llamacpp"
    max_shlokas: int = 15

def format_prompt(verses: List[Dict[str, Any]]) -> str:
    """Formats the verses into a prompt for the LLM."""
    text_to_summarize = ""
    for v in verses:
        verse_num = v.get("verse_number", v.get("id", "?"))
        translation = v.get("translation", v.get("meaning", v.get("text", "")))
        if translation:
            text_to_summarize += f"Verse {verse_num}: {translation}\n"

    prompt = (
        "You are an expert scholar of the Bhagavad Gita and ancient texts.\n"
        "Please provide a concise, insightful summary of the following verses:\n\n"
        f"{text_to_summarize}\n"
        "Summary:"
    )
    return prompt

def _init_llamacpp():
    global global_llm
    if global_llm is None:
        try:
            from llama_cpp import Llama
        except ImportError:
            raise RuntimeError("llama-cpp-python not installed. Run: pip install llama-cpp-python")
        
        if not os.path.exists(MODEL_PATH):
            raise RuntimeError(f"Model not found at {MODEL_PATH}. Please download a .gguf model.")
            
        print(f"Loading GGUF model from {MODEL_PATH} into memory...")
        # n_ctx=2048 is generally sufficient for 15 shlokas + prompt + summary
        global_llm = Llama(
            model_path=MODEL_PATH,
            n_ctx=2048,   
            n_threads=4,
            verbose=False
        )
    return global_llm

def summarize_with_llamacpp(prompt: str) -> str:
    """Uses LLaMA.cpp (via llama-cpp-python) for fast, low-RAM CPU inference."""
    llm = _init_llamacpp()
    
    print("Generating summary (this may take a moment on CPU)...")
    start_time = time.time()
    
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

def summarize_with_airllm(prompt: str, model_repo="meta-llama/Meta-Llama-3-8B-Instruct") -> str:
    """Uses AirLLM to run larger models on low-RAM machines."""
    try:
        from airllm import AutoModel
    except ImportError:
        raise RuntimeError("airllm not installed. Run: pip install airllm")

    print(f"Initializing AirLLM with {model_repo} (loads layer-by-layer to save RAM)...")
    # AirLLM automatically handles memory paging
    model = AutoModel.from_pretrained(model_repo)
    # Placeholder for actual tokenization and generation
    return "AirLLM integration placeholder: Requires model weights to be downloaded (~15GB)."

async def llm_worker():
    """Background worker that processes one request at a time to prevent RAM bloat."""
    print("Starting LLM worker...")
    while True:
        task_future, req_data = await request_queue.get()
        try:
            verses = req_data.verses
            max_shlokas = req_data.max_shlokas
            
            # Enforce memory constraints by limiting the number of shlokas
            if len(verses) > max_shlokas:
                print(f"[Memory Constraint] Chapter has {len(verses)} shlokas. Limiting to first {max_shlokas}.")
                verses = verses[:max_shlokas]
                
            prompt = format_prompt(verses)
            backend = req_data.backend
            
            if backend == 'llamacpp':
                # Run CPU-bound LLM generation in a separate thread
                summary = await asyncio.to_thread(summarize_with_llamacpp, prompt)
            else:
                summary = await asyncio.to_thread(summarize_with_airllm, prompt)
                
            task_future.set_result(summary)
        except Exception as e:
            print(f"Error processing request: {e}")
            task_future.set_exception(e)
        finally:
            request_queue.task_done()

@app.on_event("startup")
async def startup_event():
    # Start the single background worker task
    asyncio.create_task(llm_worker())

@app.post("/api/summarize")
async def enqueue_summary(req: SummarizeRequest):
    """Enqueue a summarization request and await its completion safely."""
    loop = asyncio.get_running_loop()
    task_future = loop.create_future()
    
    await request_queue.put((task_future, req))
    
    try:
        # Await the result from the worker
        summary = await task_future
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
