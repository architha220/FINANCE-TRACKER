from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from datetime import datetime, timedelta

from .database import engine, SessionLocal
from . import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
SECRET_KEY = "finance_tracker_secret"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# Database Dependency
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Finance Tracker Backend Running"}


# Signup API
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    )

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password.decode("utf-8")
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User Created Successfully"
    }
   # Login API
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User Not Found"
        }

    password_correct = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user.password.encode("utf-8")
    )

    if not password_correct:
        return {
            "message": "Incorrect Password"
        }

    access_token = create_access_token(
        data={
            "user_id": existing_user.id
        }
    )

    return {
        "message": "Login Successful",
        "token": access_token,
        "user_id": existing_user.id,
        "name": existing_user.name
    }


    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User Not Found"
        }

    password_correct = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user.password.encode("utf-8")
    )

    if not password_correct:
        return {
            "message": "Incorrect Password"
        }
    access_token = create_access_token(
    data={
        "user_id": existing_user.id
    }
)


    return {
        "message": "Login Successful",
        "user_id": existing_user.id,
        "name": existing_user.name
    }
# Add Transaction API
@app.post("/add-transaction")
def add_transaction(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db)
):

    new_transaction = models.Transaction(
        title=transaction.title,
        amount=transaction.amount,
        category=transaction.category,
        date=transaction.date,
        type=transaction.type,
        month=transaction.month,
        year=transaction.year,
        user_id=transaction.user_id
    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    return {
        "message": "Transaction Added Successfully"
    }


# Get Transactions API
@app.get("/transactions/{user_id}")
def get_transactions(
    user_id: int,
    db: Session = Depends(get_db)
):

    transactions = db.query(models.Transaction).filter(
        models.Transaction.user_id == user_id
    ).all()

    return transactions