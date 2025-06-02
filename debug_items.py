from pymongo import MongoClient
import json
from bson import ObjectId
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.get_database('Newpy')
items_collection = db.items

print('Examining all items in detail:')
items = list(items_collection.find())

for i, item in enumerate(items):
    print(f"\n=== ITEM {i+1} ===")
    print(f"Name: {item.get('name', 'Unnamed')}")
    print("All fields and their types:")
    
    for key, value in item.items():
        print(f"  {key}: {type(value).__name__} = {repr(value)}")
    
    print("\nTrying to serialize this item...")
    try:
        # Try manual conversion
        converted_item = {}
        for key, value in item.items():
            if isinstance(value, ObjectId):
                converted_item[key] = str(value)
                print(f"  Converted ObjectId {key}: {value} -> {str(value)}")
            elif isinstance(value, datetime):
                converted_item[key] = value.isoformat()
                print(f"  Converted datetime {key}: {value} -> {value.isoformat()}")
            else:
                converted_item[key] = value
                print(f"  Kept {key} as-is: {type(value).__name__}")
        
        # Try to serialize
        json_str = json.dumps(converted_item)
        print("✅ Successfully serialized!")
        
    except Exception as e:
        print(f"❌ Failed to serialize: {e}")
        print("Problematic field details:")
        for key, value in item.items():
            try:
                json.dumps({key: value})
            except Exception as field_error:
                print(f"  Problem with {key} ({type(value)}): {field_error}")
    
    print("-" * 50)
