import sqlite3
conn = sqlite3.connect('public/vedic-lake.db')
print([col[1] for col in conn.execute('PRAGMA table_info(verses)').fetchall()])
