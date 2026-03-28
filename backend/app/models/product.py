from sqlalchemy import Boolean, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    brand: Mapped[str] = mapped_column(String(100), nullable=False)
    main_category: Mapped[str] = mapped_column(String(50), nullable=False)
    sub_category: Mapped[str] = mapped_column(String(100), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    original_price: Mapped[float] = mapped_column(Float, nullable=False)
    rating: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    review_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    best_seller: Mapped[bool] = mapped_column(Boolean, default=False)
    use_case: Mapped[str] = mapped_column(Text, nullable=False)
    noise_cancellation: Mapped[bool] = mapped_column(Boolean, default=False)
    battery_life: Mapped[str] = mapped_column(String(50), nullable=False)
    connectivity: Mapped[str] = mapped_column(String(100), nullable=False)
    mic: Mapped[bool] = mapped_column(Boolean, default=False)
    color: Mapped[str] = mapped_column(String(100), nullable=False)
    image: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
