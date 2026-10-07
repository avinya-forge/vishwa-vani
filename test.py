import sqlite3
conn = sqlite3.connect('public/vedic-lake.db')
cursor = conn.cursor()
cursor.execute("SELECT sql FROM sqlite_master WHERE type='table'")
for row in cursor.fetchall():
    print(row[0])
