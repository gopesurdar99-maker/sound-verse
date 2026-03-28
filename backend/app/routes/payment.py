import razorpay
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/payment", tags=["Payment"])

client = razorpay.Client(auth=("YOUR_KEY", "YOUR_SECRET"))

class PaymentRequest(BaseModel):
    amount: float

@router.post("/create-order")
def create_order(req: PaymentRequest):
    order = client.order.create({
        "amount": int(req.amount * 100),
        "currency": "INR"
    })
    return order
