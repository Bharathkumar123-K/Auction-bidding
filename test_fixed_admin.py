import requests
import json

# Test the fixed admin items endpoint
base_url = "http://localhost:5000/api"

# First, let's try to login as admin
login_data = {
    "username": "admin",
    "password": "admin123"
}

print("Testing admin login...")
try:
    response = requests.post(f"{base_url}/admin/login", json=login_data)
    print(f"Login response status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        token = data.get('access_token')
        print(f"Got token: {token[:20]}..." if token else "No token received")
        
        # Now try to get admin items using the fixed endpoint
        headers = {"Authorization": f"Bearer {token}"}
        print("\nTesting FIXED admin items API...")
        items_response = requests.get(f"{base_url}/admin/items-fixed", headers=headers)
        print(f"Items response status: {items_response.status_code}")
        
        if items_response.status_code == 200:
            items = items_response.json()
            print(f"Successfully got {len(items)} items!")
            for i, item in enumerate(items[:3]):  # Show first 3 items
                print(f"Item {i+1}: {item.get('name', 'Unnamed')} - ${item.get('current_price', 0)}")
        else:
            print(f"Items response: {items_response.text}")
        
    else:
        print("Login failed, cannot test items API")
        
except Exception as e:
    print(f"Error: {e}")
