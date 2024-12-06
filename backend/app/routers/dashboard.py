from fastapi import APIRouter, Depends
from typing import List
from ..models.schemas import DashboardSummary, Transaction
from ..database import get_database
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(db=Depends(get_database)):
    # Get recent transactions
    recent_transactions = await db.transactions.find().sort("date", -1).limit(5).to_list(5)
    
    # Calculate month-to-date totals
    month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    pipeline = [
        {
            "$match": {
                "date": {"$gte": month_start}
            }
        },
        {
            "$group": {
                "_id": "$type",
                "total": {"$sum": "$amount"}
            }
        }
    ]
    
    monthly_totals = await db.transactions.aggregate(pipeline).to_list(None)
    
    monthly_income = 0
    monthly_spend = 0
    
    for total in monthly_totals:
        if total["_id"] == "Income":
            monthly_income = total["total"]
        else:
            monthly_spend = total["total"]
    
    total_balance = monthly_income - monthly_spend
    
    return {
        "total_balance": total_balance,
        "monthly_spend": monthly_spend,
        "monthly_income": monthly_income,
        "recent_transactions": recent_transactions
    }