from pydantic import BaseModel, ConfigDict
from typing import List


class OrderItemInput(BaseModel):
    id: int
    name: str
    price: float
    image: str
    quantity: int


class OrderCreate(BaseModel):
    billing_name: str
    customer_name: str
    customer_email: str
    customer_phone: str | None = None
    address_line_1: str | None = None
    address_line_2: str | None = None
    city: str | None = None
    state: str | None = None
    pincode: str | None = None
    items: List[OrderItemInput]
    subtotal: float
    shipping: float
    total_amount: float
    payment_method: str = "UPI"
    payment_reference: str = ""


class OrderResponse(BaseModel):
    id: int
    order_code: str
    payment_reference: str
    billing_name: str
    customer_name: str
    customer_email: str
    customer_phone: str
    address_line_1: str
    address_line_2: str
    city: str
    state: str
    pincode: str
    items_json: str
    subtotal: float
    shipping: float
    total_amount: float
    payment_method: str
    payment_status: str
    order_status: str

    model_config = ConfigDict(from_attributes=True)
