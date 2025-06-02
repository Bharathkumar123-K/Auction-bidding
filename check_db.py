from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.get_database('Newpy')

print('Items in database:')
items = list(db.items.find())
for item in items:
    print(f'- {item.get("name", "Unnamed")} (ID: {item["_id"]})')
print(f'Total items: {len(items)}')
print()

print('Users in database:')
users = list(db.users.find())
for user in users:
    print(f'- {user.get("username", "Unknown")} ({user.get("user_type", "user")})')
print(f'Total users: {len(users)}')
print()

print('Bids in database:')
bids = list(db.bids.find())
for bid in bids:
    print(f'- ${bid.get("amount", 0)} on item {bid.get("item_id", "Unknown")}')
print(f'Total bids: {len(bids)}')
