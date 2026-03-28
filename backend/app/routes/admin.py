from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import require_admin
from app.models.order import Order
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdateStock

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/products", response_model=list[ProductResponse])
def get_admin_products(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    return db.query(Product).order_by(Product.id.desc()).all()


@router.post("/products", response_model=ProductResponse)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    existing = db.query(Product).filter(Product.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product with this slug already exists")

    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.patch("/products/{product_id}/stock", response_model=ProductResponse)
def update_product_stock(
    product_id: int,
    payload: ProductUpdateStock,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.stock = payload.stock
    db.commit()
    db.refresh(product)
    return product


@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}


@router.get("/orders")
def get_admin_orders(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    orders = db.query(Order).order_by(Order.id.desc()).all()

    return [
        {
            "id": order.id,
            "order_code": order.order_code,
            "customer_name": order.customer_name,
            "customer_email": order.customer_email,
            "customer_phone": order.customer_phone,
            "total_amount": order.total_amount,
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
            "order_status": order.order_status,
        }
        for order in orders
    ]


@router.get("/alerts/low-stock")
def get_low_stock_alerts(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    low_stock_products = (
        db.query(Product)
        .filter(Product.stock <= 5)
        .order_by(Product.stock.asc(), Product.id.desc())
        .all()
    )

    return [
        {
            "id": product.id,
            "name": product.name,
            "brand": product.brand,
            "stock": product.stock,
            "main_category": product.main_category,
            "sub_category": product.sub_category,
        }
        for product in low_stock_products
    ]


@router.get("/dashboard-summary")
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    total_products = db.query(Product).count()
    total_orders = db.query(Order).count()
    low_stock_count = db.query(Product).filter(Product.stock <= 5).count()
    featured_count = db.query(Product).filter(Product.featured == True).count()
    pending_users = db.query(User).filter(User.is_approved == False).count()

    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "low_stock_count": low_stock_count,
        "featured_products": featured_count,
        "pending_users": pending_users,
    }


@router.get("/users")
def get_admin_users(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    users = db.query(User).order_by(User.id.desc()).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_approved": user.is_approved,
        }
        for user in users
    ]


@router.patch("/users/{user_id}/approve")
def approve_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_approved = True
    db.commit()

    return {"message": "User approved successfully"}


@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role == "admin":
        raise HTTPException(status_code=400, detail="Admin users cannot be deleted here")

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}


class OrderStatusUpdate(BaseModel):
    order_status: str


@router.patch("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    payload: OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin),
):
    allowed_statuses = [
        "pending",
        "confirmed",
        "packed",
        "dispatched",
        "out_for_delivery",
        "delivered",
        "cancelled",
    ]

    if payload.order_status not in allowed_statuses:
        raise HTTPException(status_code=400, detail="Invalid order status")

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.order_status = payload.order_status
    db.commit()

    return {"message": "Order status updated successfully"}
