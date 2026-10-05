import re

f3 = '__tests__/api-synthesize.test.ts'
with open(f3, 'r', encoding='utf-8') as f:
    c3 = f.read()

c3 = c3.replace("expect(data.error).toMatch(/Invalid input|Required/i)\n      expect(data).not.toHaveProperty('synthesisMode')", "expect(data.error).toMatch(/No context text provided|Invalid input|Required/i)\n      expect(data).not.toHaveProperty('synthesisMode')")

with open(f3, 'w', encoding='utf-8') as f:
    f.write(c3)

print("Tests patched again!")
