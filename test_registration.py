import requests
import json

# Test user registration
base_url = "http://localhost:5000/api"

# Test user registration
user_data = {
    "username": "testuser123",
    "email": "testuser123@example.com",
    "password": "password123",
    "phone_number": "+1234567890",
    "address": "123 Test Street"
}

print("Testing user registration...")
try:
    response = requests.post(f"{base_url}/register", json=user_data)
    print(f"Registration response status: {response.status_code}")
    print(f"Registration response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

# Test admin registration
admin_data = {
    "username": "testadmin123",
    "email": "testadmin123@example.com",
    "password": "password123",
    "phone_number": "+1234567890",
    "address": "123 Admin Street",
    "admin_code": "ADMIN123"
}

print("\nTesting admin registration...")
try:
    response = requests.post(f"{base_url}/admin/register", json=admin_data)
    print(f"Admin registration response status: {response.status_code}")
    print(f"Admin registration response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

# Test simple endpoint
print("\nTesting simple endpoint...")
try:
    response = requests.get(f"http://localhost:5000/test")
    print(f"Test endpoint response status: {response.status_code}")
    print(f"Test endpoint response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
