from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    name: str
    slug: str
    brand: str
    main_category: str
    sub_category: str
    price: float
    original_price: float
    rating: float
    review_count: int
    stock: int
    featured: bool
    best_seller: bool
    use_case: str
    noise_cancellation: bool
    battery_life: str
    connectivity: str
    mic: bool
    color: str
    image: str
    description: str


class ProductCreate(ProductBase):
    pass


class ProductUpdateStock(BaseModel):
    stock: int


class ProductResponse(ProductBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
