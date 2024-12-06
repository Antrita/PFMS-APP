from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongodb, close_mongodb_connection
from app.routers import transactions, dashboard, analytics, profile
from app.config import settings
import os
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="PFMS API",
    description="Personal Financial Management System API",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React development server
        os.getenv("CLIENT_URL", "http://localhost:3000")  # Production client URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to PFMS API",
        "version": "1.0.0",
        "status": "active"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("NODE_ENV", "development")
    }

# Include routers with prefixes
app.include_router(
    transactions.router,
    prefix="/api/transactions",
    tags=["Transactions"]
)

app.include_router(
    dashboard.router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    analytics.router,
    prefix="/api/analytics",
    tags=["Analytics"]
)

app.include_router(
    profile.router,
    prefix="/api/profile",
    tags=["Profile"]
)

# Database connection events
@app.on_event("startup")
async def startup_db_client():
    try:
        await connect_to_mongodb()
        print("Connected to MongoDB!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    try:
        await close_mongodb_connection()
        print("Closed MongoDB connection!")
    except Exception as e:
        print(f"Error closing MongoDB connection: {str(e)}")

# Error handling
@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {
        "status": "error",
        "message": "Internal server error",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )