from sqlalchemy import Float, Integer, String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user = relationship("User")
    order_code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    payment_reference: Mapped[str] = mapped_column(String(80), default="")
    billing_name: Mapped[str] = mapped_column(String(150), default="")
    customer_name: Mapped[str] = mapped_column(String(150), default="Guest User")
    customer_email: Mapped[str] = mapped_column(String(255), default="guest@soundverse.com")
    customer_phone: Mapped[str] = mapped_column(String(30), default="")
    address_line_1: Mapped[str] = mapped_column(String(255), default="")
    address_line_2: Mapped[str] = mapped_column(String(255), default="")
    city: Mapped[str] = mapped_column(String(100), default="")
    state: Mapped[str] = mapped_column(String(100), default="")
    pincode: Mapped[str] = mapped_column(String(20), default="")
    items_json: Mapped[str] = mapped_column(Text)
    subtotal: Mapped[float] = mapped_column(Float)
    shipping: Mapped[float] = mapped_column(Float)
    total_amount: Mapped[float] = mapped_column(Float)
    payment_method: Mapped[str] = mapped_column(String(50), default="UPI")
    payment_status: Mapped[str] = mapped_column(String(50), default="paid")
    order_status: Mapped[str] = mapped_column(String(50), default="pending")
