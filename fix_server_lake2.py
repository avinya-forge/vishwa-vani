import os

with open('lib/server-lake.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(len(lines)):
    if 'throw new Error(\SQLITE_CANTOPEN' in lines[i] or 'throw new Error(\\\SQLITE_CANTOPEN' in lines[i]:
        lines[i] = "    throw new Error('SQLITE_CANTOPEN: DB file missing at resolved path: ' + dbPath);\n"

with open('lib/server-lake.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
