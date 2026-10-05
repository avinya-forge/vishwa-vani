import json

with open("package.json", "r", encoding="utf-8") as f:
    data = json.load(f)

if data.get("scripts", {}).get("lint") == "eslint":
    data["scripts"]["lint"] = "next lint"

with open("package.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
