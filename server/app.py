from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import statistics

app = Flask(__name__)
CORS(app)
def calculate_statistics(values):
    if not values:
        return None

    return {
        "mean": statistics.mean(values),
        "mode": statistics.mode(values),
        "median": statistics.median(values),
        "min": min(values),
        "max": max(values),
        "variance": statistics.variance(values)
       
    }

@app.route('/statistics')
def get_statistics():
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["task1"]
    collection = db["data"]

    columns = collection.find_one()  # Assuming the first document has all the columns
    column_names = list(columns.keys()) if columns else []

    statistics_results = {
        "mean": {},
        "mode": {}, 
        "median": {},
        "min": {},
        "max": {},
        "variance": {},
       
    }

    for column_name in column_names:
        if column_name == '_id':
            continue  # Skip the ObjectId column
        
        column_values = [item[column_name] for item in collection.find({}, {column_name: 1})]

        # Filter out non-numeric values
        numeric_values = [value for value in column_values if isinstance(value, (int, float))]

        if numeric_values:
            statistics = calculate_statistics(numeric_values)
            statistics_results["mean"][column_name] = statistics["mean"]
            statistics_results["mode"][column_name] = statistics["mode"]
            statistics_results["median"][column_name] = statistics["median"]
            statistics_results["min"][column_name] = statistics["min"]
            statistics_results["max"][column_name] = statistics["max"]
            statistics_results["variance"][column_name] = statistics["variance"]
           
    return jsonify(statistics_results)

if __name__ == '__main__':
    app.run(debug=True)
