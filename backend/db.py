from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:pass@localhost:3306/job_tracker", echo=True)
SessionLocal = sessionmaker(bind=engine)

# declarative base class
class Base(DeclarativeBase):
    pass
