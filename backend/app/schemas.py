from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class TransactionCreate(BaseModel):
    title: str
    amount: int
    category: str
    date: str
    type: str
    month: str
    year: str
    user_id: int