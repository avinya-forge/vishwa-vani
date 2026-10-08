import os

with open('lib/server-lake.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.strip() == "const fs = require('fs');":
        continue
    if line.startswith("import crypto from 'crypto';"):
        new_lines.append(line)
        new_lines.append("import fs from 'fs';\n")
    else:
        new_lines.append(line)

with open('lib/server-lake.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
