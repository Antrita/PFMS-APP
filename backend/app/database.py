from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client[settings.database_name]

async def connect_to_mongodb():
    db.client = AsyncIOMotorClient(settings.mongodb_url)
    print("Connected to MongoDB!")

async def close_mongodb_connection():
    if db.client:
        db.client.close()
        print("Closed MongoDB connection!")