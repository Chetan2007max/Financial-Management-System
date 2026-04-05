from ..ml.predictor import get_advisor_output, get_goal_output

def get_advisor_recommendation(data):
    return get_advisor_output(data)

def get_goal_recommendation(data):
    return get_goal_output(data)
