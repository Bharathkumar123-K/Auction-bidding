import requests
import json

# Test the admin login and items API
base_url = "http://localhost:5000/api"

# First, let's try to login as admin
login_data = {
    "username": "admin",
    "password": "admin123"  # You might need to adjust this password
}

print("Testing admin login...")
try:
    response = requests.post(f"{base_url}/admin/login", json=login_data)
    print(f"Login response status: {response.status_code}")
    print(f"Login response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        token = data.get('access_token')
        print(f"Got token: {token[:20]}..." if token else "No token received")
        
        # Now try to get admin items
        headers = {"Authorization": f"Bearer {token}"}
        print("\nTesting admin items API...")
        items_response = requests.get(f"{base_url}/admin/items", headers=headers)
        print(f"Items response status: {items_response.status_code}")
        print(f"Items response: {items_response.text}")
        
    else:
        print("Login failed, cannot test items API")
        
except Exception as e:
    print(f"Error: {e}")
