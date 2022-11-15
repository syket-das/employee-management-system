from fastapi import FastAPI
import db
import models
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://payroll-lpu.netlify.app",
    "http://localhost:3000",
    "http://localhost:8080",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")   
def root():
    return {"message": "Hello World"}


@app.get("/all")
def get_all():
    return {"data": db.all()}


@app.get("/get/{name}")
def get_one(name):
    return {"data": db.get_one(name)}


@app.post("/create")
def create(data: models.Employee):
    return {"data": db.create(data)}


@app.delete("/delete/{name}")
def delete(name: str):
    return {"data": db.delete(name)}


@app.put("/update/{name}")
def update(name: str, data: models.Employee):
    return {"data": db.update(name, data)}