from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime
from ..models.schemas import Transaction, TransactionCreate
from ..database import get_database
from bson import ObjectId

router = APIRouter()

CATEGORY_KEYWORDS = {
    'travel': ['uber', 'ola', 'railway', 'airlines', 'travel'],
    'bills': ['electricity', 'water', 'gas', 'utility', 'bill'],
    'groceries': ['supermarket', 'grocery', 'market'],
    'education': ['school', 'college', 'university', 'course'],
    'leisure': ['restaurant', 'movie', 'entertainment'],
    'emi': ['loan', 'emi', 'payment'],
    'mobile': ['recharge', 'mobile', 'phone'],
    'health': ['hospital', 'medical', 'pharmacy'],
    'shopping': ['mall', 'shop', 'store', 'amazon', 'flipkart']
}

@router.get("/", response_model=List[Transaction])
async def get_transactions(
    skip: int = 0,
    limit: int = 100,
    db=Depends(get_database)
):
    transactions = await db.transactions.find().skip(skip).limit(limit).to_list(length=limit)
    return transactions

@router.post("/", response_model=Transaction)
async def create_transaction(transaction: TransactionCreate, db=Depends(get_database)):
    # Auto-categorize if category not provided
    if not transaction.category:
        transaction.category = categorize_transaction(transaction.description)

    new_transaction = Transaction(
        id=str(ObjectId()),
        date=datetime.now(),
        **transaction.dict()
    )
    
    await db.transactions.insert_one(new_transaction.dict())
    return new_transaction

@router.get("/{transaction_id}", response_model=Transaction)
async def get_transaction(transaction_id: str, db=Depends(get_database)):
    transaction = await db.transactions.find_one({"id": transaction_id})
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.delete("/{transaction_id}")
async def delete_transaction(transaction_id: str, db=Depends(get_database)):
    result = await db.transactions.delete_one({"id": transaction_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted"}

def categorize_transaction(description: str) -> str:
    description_lower = description.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in description_lower for keyword in keywords):
            return category
    return 'misc'