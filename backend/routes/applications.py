from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from db import SessionLocal
from models import Applications
from schemas import ApplicationOut, ApplicationCreate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/applications", response_model=list[ApplicationOut])
def read_applications(db: Session = Depends(get_db)):
    return db.query(Applications).all()

@app.post("/applications")
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    new_application = Applications(**application.model_dump())
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application