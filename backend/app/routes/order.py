import json
import random
import time

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.order import Order
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])


def generate_order_code() -> str:
    return f"SV-{int(time.time())}-{random.randint(100, 999)}"


@router.post("/", response_model=OrderResponse)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = Order(
        user_id=current_user.id,
        order_code=generate_order_code(),
        payment_reference=payload.payment_reference,
        billing_name=payload.billing_name,
        customer_name=payload.customer_name,
        customer_email=payload.customer_email,
        customer_phone=payload.customer_phone or "",
        address_line_1=payload.address_line_1 or "",
        address_line_2=payload.address_line_2 or "",
        city=payload.city or "",
        state=payload.state or "",
        pincode=payload.pincode or "",
        items_json=json.dumps([item.model_dump() for item in payload.items]),
        subtotal=payload.subtotal,
        shipping=payload.shipping,
        total_amount=payload.total_amount,
        payment_method=payload.payment_method,
        payment_status="pending" if payload.payment_method == "COD" else "paid",
        order_status="pending",
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("/{order_code}", response_model=OrderResponse)
def get_order(
    order_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = db.query(Order).filter(Order.order_code == order_code).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return order


@router.get("/me/orders")
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.id.desc())
        .all()
    )

    return [
        {
            "order_code": o.order_code,
            "payment_reference": o.payment_reference,
            "billing_name": o.billing_name,
            "customer_name": o.customer_name,
            "customer_email": o.customer_email,
            "customer_phone": o.customer_phone,
            "address_line_1": o.address_line_1,
            "address_line_2": o.address_line_2,
            "city": o.city,
            "state": o.state,
            "pincode": o.pincode,
            "items_json": o.items_json,
            "subtotal": o.subtotal,
            "shipping": o.shipping,
            "total_amount": o.total_amount,
            "payment_method": o.payment_method,
            "payment_status": o.payment_status,
            "order_status": o.order_status,
        }
        for o in orders
    ]


@router.patch("/{order_code}/cancel")
def cancel_my_order(
    order_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = db.query(Order).filter(Order.order_code == order_code).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if order.order_status in ["dispatched", "out_for_delivery", "delivered", "cancelled"]:
        raise HTTPException(status_code=400, detail="Order cannot be cancelled at this stage")

    order.order_status = "cancelled"
    db.commit()
    return {"message": "Order cancelled successfully"}
