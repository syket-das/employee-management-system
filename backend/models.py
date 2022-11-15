from pydantic import BaseModel


class Employee(BaseModel):
    name: str
    email: str
    base_salary: int
    overtime: int
    deduction: int
    date: str
    