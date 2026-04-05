import pickle
import os
from sklearn.cluster import KMeans
import pandas as pd

# Dummy data for clustering (replace with real data)
data = {
    'age': [20, 25, 30, 35, 40, 45, 50, 55, 60],
    'income': [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000]
}
df = pd.DataFrame(data)
model = KMeans(n_clusters=3, random_state=42)
model.fit(df[['age', 'income']])

def load_model():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, "../../.."))
    model_path = os.path.join(project_root, "ml_model", "models", "model.pkl")
    with open(model_path, "rb") as f:
        return pickle.load(f)

def risk_profile(age):
    if age <= 25:
        return "High"
    elif age <= 40:
        return "Medium"
    else:
        return "Low"

def recommend_sip(risk):
    funds = {
        "High": ["Aggressive Growth Fund", "Equity Savings Fund"],
        "Medium": ["Balanced Advantage Fund", "Multi-Asset Fund"],
        "Low": ["Conservative Hybrid Fund", "Short Term Debt Fund"]
    }
    return funds.get(risk, [])

def recommend_fd():
    banks = ["SBI", "HDFC", "ICICI", "Axis"]
    return banks

def financial_health_score(remaining_income, investment_budget):
    if remaining_income > 0 and investment_budget > 0:
        return "Good"
    elif remaining_income > 0:
        return "Average"
    else:
        return "Poor"

def get_advisor_output(data):
    income = float(data['income'])
    expenses = float(data['expenses'])
    age = int(data['age'])
    
    total_expenses = expenses
    remaining_income = income - total_expenses
    luxury_budget = remaining_income * 0.4
    investment_budget = remaining_income * 0.6
    
    risk = risk_profile(age)
    cluster = int(model.predict([[age, income]])[0])
    cluster_type = ["Conservative", "Balanced", "Aggressive"][cluster]
    
    sip_funds = recommend_sip(risk)
    fd_banks = recommend_fd()
    
    health_score = financial_health_score(remaining_income, investment_budget)
    
    monthly_allocation = {
        "SIP": investment_budget * 0.5,
        "FD": investment_budget * 0.3,
        "Insurance": investment_budget * 0.2
    }
    
    return {
        "income": income,
        "expenses": expenses,
        "remaining_income": remaining_income,
        "luxury_budget": luxury_budget,
        "investment_budget": investment_budget,
        "cluster_type": cluster_type,
        "strategy": f"{cluster_type} Investment Strategy",
        "financial_health_score": health_score,
        "status": "Active",
        "recommended_sip_funds": sip_funds,
        "best_fd_banks": fd_banks,
        "insurance": "Term Life Insurance recommended",
        "monthly_investment_allocation": monthly_allocation
    }

def get_goal_output(data):
    goal_amount = float(data['goal_amount'])
    months = int(data['months'])
    income = float(data['income'])
    expenses = float(data['expenses'])
    age = int(data['age'])
    
    remaining = income - expenses
    monthly_goal = goal_amount / months
    risk = risk_profile(age)
    
    monthly_saving_required = max(0, monthly_goal - remaining)
    
    strategy = f"{risk} Risk Goal Strategy"
    sip_funds = recommend_sip(risk)
    fd_banks = recommend_fd()
    
    monthly_plan = {
        "SIP": monthly_goal * 0.6,
        "FD": monthly_goal * 0.3,
        "Insurance": monthly_goal * 0.1
    }
    
    return {
        "goal_amount": goal_amount,
        "time_months": months,
        "monthly_saving_required": monthly_saving_required,
        "investment_strategy": strategy,
        "risk_profile": risk,
        "where_to_invest": ["Stocks", "Bonds", "FDs"],
        "sip_funds": sip_funds,
        "fd_banks": fd_banks,
        "monthly_investment_plan": monthly_plan,
        "sip": "Invest in recommended SIP funds",
        "fd": "Deposit in top FD banks",
        "insurance": "Get goal-specific insurance"
    }
