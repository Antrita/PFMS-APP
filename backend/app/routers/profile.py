from fastapi import APIRouter, HTTPException, Depends
from ..models.schemas import Profile, ProfileUpdate
from ..database import get_database
from bson import ObjectId
router = APIRouter()

@router.get("/", response_model=Profile)
async def get_profile(db=Depends(get_database)):
    profile = await db.profiles.find_one({})
    if not profile:
        # Return default profile if none exists
        return {
            "name": "Demo User",
            "email": "demo@example.com",
            "budget": 50000,
            "currency": "INR",
            "notifications": True
        }
    return profile

@router.put("/", response_model=Profile)
async def update_profile(profile_update: ProfileUpdate, db=Depends(get_database)):
    profile = await db.profiles.find_one({})
    if not profile:
        # Create new profile
        new_profile = Profile(
            **profile_update.dict(),
            id=str(ObjectId())
        )
        await db.profiles.insert_one(new_profile.dict())
        return new_profile
    
    # Update existing profile
    updated_profile = {**profile, **profile_update.dict()}
    await db.profiles.update_one(
        {"_id": profile["_id"]},
        {"$set": profile_update.dict()}
    )
    return updated_profile