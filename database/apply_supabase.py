import urllib.request
import json
import os

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://mjenunxgakcvyzcikjmi.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
TOKEN = os.environ.get("SUPABASE_TOKEN", "")
PROJECT_REF = os.environ.get("SUPABASE_PROJECT_REF", "mjenunxgakcvyzcikjmi")

def execute_sql(sql_content):
    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/json',
        'User-Agent': 'Python-Script'
    }
    data = json.dumps({'query': sql_content}).encode('utf-8')
    req = urllib.request.Request(
        f'https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query',
        data=data,
        headers=headers
    )
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode())
            print("✅ SQL Execution Result:", res)
            return True
    except urllib.error.HTTPError as e:
        print("❌ HTTP Error:", e.code, e.read().decode())
        return False
    except Exception as e:
        print("❌ Error:", e)
        return False

if __name__ == "__main__":
    with open("schema.sql", "r", encoding="utf-8") as f:
        schema_sql = f.read()

    with open("seed.sql", "r", encoding="utf-8") as f:
        seed_sql = f.read()

    print("Executing schema.sql on Supabase...")
    if execute_sql(schema_sql):
        print("Schema created successfully!")

    print("Executing seed.sql on Supabase...")
    if execute_sql(seed_sql):
        print("Seed data inserted successfully!")
