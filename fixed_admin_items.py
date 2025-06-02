from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime

def serialize_item_for_admin(item):
    """Convert MongoDB document to JSON-serializable format for admin"""
    if not item:
        return None
    
    serialized = {}
    for key, value in item.items():
        if isinstance(value, ObjectId):
            serialized[key] = str(value)
        elif isinstance(value, datetime):
            serialized[key] = value.isoformat()
        else:
            serialized[key] = value
    return serialized

def create_admin_items_endpoint(app, items_collection):
    """Create the admin items endpoint"""
    
    @app.route('/api/admin/items-fixed', methods=['GET'])
    @jwt_required()
    def get_admin_items_fixed():
        print("=== FIXED ADMIN ITEMS ENDPOINT CALLED ===")
        try:
            user_id = get_jwt_identity()
            print(f"Admin user ID: {user_id}")

            # Get all items from database
            print("Fetching items from database...")
            items = list(items_collection.find())
            print(f"Found {len(items)} items in database")

            # Serialize each item
            result = []
            for item in items:
                try:
                    serialized = serialize_item_for_admin(item)
                    result.append(serialized)
                    print(f"Serialized item: {serialized.get('name', 'Unnamed')}")
                except Exception as e:
                    print(f"Error serializing item {item.get('_id')}: {str(e)}")
                    continue

            print(f"Successfully serialized {len(result)} items")
            return jsonify(result)

        except Exception as e:
            print(f"Error in get_admin_items_fixed: {str(e)}")
            return jsonify({'error': f'Server error: {str(e)}'}), 500
    
    return get_admin_items_fixed
