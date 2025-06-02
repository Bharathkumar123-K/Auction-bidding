from pymongo import MongoClient
import json
from bson import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client.get_database('Newpy')

print('Sample item structure:')
items = list(db.items.find().limit(1))
if items:
    item = items[0]
    print("Fields in item:")
    for key, value in item.items():
        print(f"  {key}: {type(value)} = {value}")
        
    print("\nTrying to serialize with json.dumps...")
    try:
        # Try to serialize the item as-is
        json.dumps(item, default=str)
        print("✅ Serialization successful with default=str")
    except Exception as e:
        print(f"❌ Serialization failed: {e}")
        
    print("\nConverting ObjectIds manually...")
    try:
        # Convert all ObjectId fields to strings
        def convert_objectid(obj):
            if isinstance(obj, ObjectId):
                return str(obj)
            elif isinstance(obj, dict):
                return {k: convert_objectid(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_objectid(v) for v in obj]
            return obj
            
        converted_item = convert_objectid(item)
        json.dumps(converted_item)
        print("✅ Manual conversion successful")
        print("Converted item structure:")
        for key, value in converted_item.items():
            print(f"  {key}: {type(value)} = {value}")
    except Exception as e:
        print(f"❌ Manual conversion failed: {e}")
else:
    print("No items found in database")
