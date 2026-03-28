from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.models.order import Order
from app.models.product import Product
from app.models.user import User
from app.routes.admin import router as admin_router
from app.routes.auth import router as auth_router
from app.routes.order import router as order_router
from app.routes.product import router as product_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SoundVerse API", version="1.0.0", redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(order_router)
app.include_router(auth_router)
app.include_router(admin_router)


@app.get("/")
def root():
    return {"message": "SoundVerse API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}
