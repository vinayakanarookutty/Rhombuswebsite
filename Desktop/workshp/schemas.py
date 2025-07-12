from pydantic import BaseModel, EmailStr
from datetime import date

class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    designation: str
    salary: float
    joining_date: date

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    designation: str | None = None
    salary: float | None = None
    joining_date: date | None = None

class EmployeeOut(EmployeeBase):
    id: int
    class Config:
        orm_mode = True
