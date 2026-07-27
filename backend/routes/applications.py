from fastapi import FastAPI, Depends, HTTPException
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

@app.patch("/applications/{id}", response_model=ApplicationOut)
def update_application(id: int, application: ApplicationCreate, db: Session = Depends(get_db)):
    db_application = db.query(Applications).filter(Applications.id == id).first()
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")

    for key, value in application.model_dump().items():
        setattr(db_application, key, value)

    db.commit()
    db.refresh(db_application)
    return db_application

@app.delete("/applications/{id}")
def delete_application(id: int, db: Session = Depends(get_db)):
    db_item = db.query(Applications).filter(Applications.id == id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Application not found")

    db.delete(db_item)
    db.commit()
    return {"detail": "Application deleted"}