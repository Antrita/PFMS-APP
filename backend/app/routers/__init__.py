
from .transactions import router as transactions_router
from .dashboard import router as dashboard_router
from .analytics import router as analytics_router
from .profile import router as profile_router

#Exporting routers
__all__ = [
    'transactions_router',
    'dashboard_router',
    'analytics_router',
    'profile_router'
]