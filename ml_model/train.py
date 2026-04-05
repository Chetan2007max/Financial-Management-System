import pickle
import pandas as pd
from sklearn.cluster import KMeans

# Dummy data for training
data = {
    'age': [20, 25, 30, 35, 40, 45, 50, 55, 60],
    'income': [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000]
}

df = pd.DataFrame(data)

# Train K-Means model
model = KMeans(n_clusters=3, random_state=42)
model.fit(df[['age', 'income']])

# Save the model
with open("models/model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully.")
