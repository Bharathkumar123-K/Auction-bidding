import requests
import json

# Test the admin test endpoint
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
        
        # Now try to test the admin test endpoint
        headers = {"Authorization": f"Bearer {token}"}
        print("\nTesting admin test API...")
        test_response = requests.get(f"{base_url}/admin/test", headers=headers)
        print(f"Test response status: {test_response.status_code}")
        print(f"Test response: {test_response.text}")
        
    else:
        print("Login failed, cannot test admin endpoints")
        
except Exception as e:
    print(f"Error: {e}")
