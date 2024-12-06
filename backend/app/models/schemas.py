# app/models/schemas.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class TransactionBase(BaseModel):
    description: str
    amount: float
    category: Optional[str] = None
    type: str = "Expense"
    account: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    date: datetime = Field(default_factory=datetime.now)

class ProfileBase(BaseModel):
    name: str
    email: str
    budget: float
    currency: str = "INR"
    notifications: bool = True

class ProfileUpdate(ProfileBase):
    pass

class Profile(ProfileBase):
    id: Optional[str] = None

class AnalyticsSummary(BaseModel):
    total_spent: float
    budget_remaining: float
    top_categories: List[dict]

class DashboardSummary(BaseModel):
    total_balance: float
    monthly_spend: float
    monthly_income: float
    recent_transactions: List[Transaction]