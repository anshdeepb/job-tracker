from pydantic import BaseModel
from typing import Literal
from pydantic import ConfigDict

class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: Literal["applied", "interviewing", "offer", "rejected"]
    dateApplied: str
    url: str | None = None
    notes: str | None = None

class ApplicationOut(ApplicationCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)