from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import user, recommendation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(recommendation.router)

@app.get("/")
def home():
    return {"message": "FMS Backend Running"}
