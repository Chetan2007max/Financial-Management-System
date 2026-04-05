from fastapi import APIRouter
from ..services.recommendation_service import get_advisor_recommendation, get_goal_recommendation

router = APIRouter(prefix="/recommend")

@router.post("/advisor")
def advisor(data: dict):
    result = get_advisor_recommendation(data)
    return {"recommendation": result}

@router.post("/goal")
def goal(data: dict):
    result = get_goal_recommendation(data)
    return {"recommendation": result}
