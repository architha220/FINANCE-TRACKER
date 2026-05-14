from sqlalchemy import Column, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    amount = Column(Integer)

    category = Column(String)

    date = Column(String)

    type = Column(String)

    month = Column(String)

    year = Column(String)

    user_id = Column(Integer)