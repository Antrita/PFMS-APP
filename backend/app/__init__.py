
from fastapi import FastAPI
from .config import settings

app = FastAPI(
    title="PFMS API",
    description="Personal Financial Management System API",
    version="1.0.0"
)





