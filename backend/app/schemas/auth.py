from pydantic import BaseModel, EmailStr, ConfigDict


class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "customer"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    is_approved: bool

    model_config = ConfigDict(from_attributes=True)
