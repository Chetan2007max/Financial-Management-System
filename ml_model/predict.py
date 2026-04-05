import pickle

def load_model():
    with open("models/model.pkl", "rb") as f:
        return pickle.load(f)

def predict(data):
    model = load_model()
    return model.predict([data])