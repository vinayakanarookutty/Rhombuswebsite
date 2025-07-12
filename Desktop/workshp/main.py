from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, schemas, auth, utils
from fastapi.security import OAuth2PasswordRequestForm
from typing import List
from datetime import date

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if utils.authenticate_user(form_data.username, form_data.password):
        token = auth.create_token({"sub": form_data.username})
        return {"access_token": token, "token_type": "bearer"}

@app.post("/employees", response_model=schemas.EmployeeOut, dependencies=[Depends(auth.verify_token)])
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    db_emp = models.Employee(**emp.dict())
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp

@app.get("/employees", response_model=List[schemas.EmployeeOut], dependencies=[Depends(auth.verify_token)])
def list_employees(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10,
    designation: str = Query(None),
    min_salary: float = Query(None),
    max_salary: float = Query(None)
):
    query = db.query(models.Employee)
    if designation:
        query = query.filter(models.Employee.designation == designation)
    if min_salary is not None:
        query = query.filter(models.Employee.salary >= min_salary)
    if max_salary is not None:
        query = query.filter(models.Employee.salary <= max_salary)
    return query.offset(skip).limit(limit).all()

@app.get("/employees/{id}", response_model=schemas.EmployeeOut, dependencies=[Depends(auth.verify_token)])
def get_employee(id: int, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.id == id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp

@app.put("/employees/{id}", response_model=schemas.EmployeeOut, dependencies=[Depends(auth.verify_token)])
def update_employee(id: int, emp_data: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.id == id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    for key, value in emp_data.dict(exclude_unset=True).items():
        setattr(emp, key, value)
    db.commit()
    db.refresh(emp)
    return emp

@app.delete("/employees/{id}", dependencies=[Depends(auth.verify_token)])
def delete_employee(id: int, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.id == id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted successfully"}
