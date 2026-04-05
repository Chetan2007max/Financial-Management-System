from fastapi import APIRouter

router = APIRouter(prefix="/user")

@router.post("/create")
def create_user(user: dict):
    return {"status": "user created", "data": user}