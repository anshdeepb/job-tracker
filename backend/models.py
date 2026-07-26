from db import Base
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional
from sqlalchemy import Text

from sqlalchemy import Integer
from sqlalchemy import String

class Applications(Base):
    __tablename__ = 'applications'

    id = mapped_column(Integer, primary_key=True)
    company : Mapped[str] = mapped_column(String(255))
    role : Mapped[str] = mapped_column(String(255))
    status : Mapped[str] = mapped_column(String(50))
    dateApplied : Mapped[str] = mapped_column(String(20))
    url : Mapped[Optional[str]] = mapped_column(String(500))
    notes : Mapped[Optional[str]] = mapped_column(Text)