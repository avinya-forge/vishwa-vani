import os
import subprocess
import sys

def run_pipeline():
    scripts_dir = os.path.dirname(os.path.abspath(__file__))
    
    ingest_script = os.path.join(scripts_dir, "ingest_gita_bronze.py")
    parse_script = os.path.join(scripts_dir, "parse_gita_silver.py")
    compile_script = os.path.join(scripts_dir, "compile_gita_gold.py")
    
    # Loop chapters 1 to 18
    for chapter in range(1, 19):
        print(f"\n{'='*40}")
        print(f"Processing Chapter {chapter}")
        print(f"{'='*40}")
        
        # 1. Bronze Ingest
        print("--> Running Bronze Ingest")
        res = subprocess.run([sys.executable, ingest_script, str(chapter)])
        if res.returncode != 0:
            print(f"Failed at Bronze Ingest for Chapter {chapter}")
            sys.exit(1)
            
        # 2. Silver Parse
        print("--> Running Silver Parse")
        res = subprocess.run([sys.executable, parse_script, str(chapter)])
        if res.returncode != 0:
            print(f"Failed at Silver Parse for Chapter {chapter}")
            sys.exit(1)
            
        # 3. Gold Compile
        print("--> Running Gold Compile")
        res = subprocess.run([sys.executable, compile_script, str(chapter)])
        if res.returncode != 0:
            print(f"Failed at Gold Compile for Chapter {chapter}")
            sys.exit(1)
            
    print("\nPipeline completed successfully for all 18 chapters.")

if __name__ == "__main__":
    run_pipeline()
