import sys
import re
import os

def drill_down(step):
    print(f"Drilling down into {step}...")
    # Read backlog
    backlog_path = 'docs/planning/backlog.md'
    if not os.path.exists(backlog_path):
        print(f"Backlog not found at {backlog_path}")
        return

    with open(backlog_path, 'r') as f:
        content = f.read()

    # We find if the step matches any task and expand it.
    # For now, it's just a placeholder mechanism that logs.
    new_task = f"**TASK [{step}-EXPANDED]: automated granular task** | [TODO] | [Expanded]\n**SPEC:** expanded task for {step}."

    with open(backlog_path, 'a') as f:
        f.write("\n" + new_task + "\n")
    print(f"Expanded task appended to {backlog_path}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        drill_down(sys.argv[1])
    else:
        print("Provide a step.")
