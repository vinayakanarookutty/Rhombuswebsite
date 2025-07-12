from sqlalchemy import Column, Integer, String, Float, Date
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    designation = Column(String)
    salary = Column(Float)
    joining_date = Column(Date)
