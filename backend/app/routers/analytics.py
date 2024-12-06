# backend/app/routers/analytics.py
from fastapi import APIRouter, Depends
from ..database import get_database
from datetime import datetime
from typing import List, Dict

router = APIRouter()

@router.get("/summary")
async def get_analytics_summary(db=Depends(get_database)):
    try:
        # Get current month data
        month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        # Aggregate spending by category
        pipeline = [
            {
                "$match": {
                    "date": {"$gte": month_start},
                    "type": "Expense"
                }
            },
            {
                "$group": {
                    "_id": "$category",
                    "amount": {"$sum": "$amount"}
                }
            },
            {"$sort": {"amount": -1}},
            {"$limit": 5}
        ]
        
        categories = await db.transactions.aggregate(pipeline).to_list(None)
        
        # Calculate totals
        total_spent = sum(cat["amount"] for cat in categories)
        budget = 50000  # Default budget
        
        # Format for frontend charts
        top_categories = [
            {
                "category": cat["_id"] or "Uncategorized",
                "amount": round(cat["amount"], 2)
            } 
            for cat in categories
        ]

        return {
            "total_spent": round(total_spent, 2),
            "budget_remaining": round(budget - total_spent, 2),
            "top_categories": top_categories
        }
    except Exception as e:
        print(f"Error in analytics: {str(e)}")
        # Return sample data if error occurs
        return {
            "total_spent": 0,
            "budget_remaining": 50000,
            "top_categories": [
                {"category": "No Data", "amount": 0}
            ]
        }