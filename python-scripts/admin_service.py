from flask import Flask, request, jsonify
from db_config import get_database
from bson import ObjectId

app = Flask(__name__)
db = get_database()

@app.route('/get_dashboard_data', methods=['GET'])
def get_dashboard_data():
    bookings = db["bookings"].count_documents({})
    total_sales = sum(order["total_price"] for order in db["orders"].find())
    total_users = len(set(order["user_details"]["email"] for order in db["orders"].find()))

    data = {
        "total_bookings": bookings,
        "total_sales": total_sales,
        "total_users": total_users
    }
    return jsonify(data)

@app.route('/filter_branch_data', methods=['GET'])
def filter_branch_data():
    location = request.args.get("location")
    bookings = db["bookings"].find({"location": location})
    return jsonify([{
        "id": str(booking["_id"]),
        "user_details": booking["user_details"],
        "date": booking["date"],
        "location": booking["location"]
    } for booking in bookings])

@app.route('/add_expense', methods=['POST'])
def add_expense():
    data = request.json
    description = data.get("description")
    amount = data.get("amount")

    expense = {
        "description": description,
        "amount": amount,
        "created_at": datetime.now()
    }
    db["expenses"].insert_one(expense)
    return jsonify({"message": "Expense added successfully!"}), 201

@app.route('/get_expenses', methods=['GET'])
def get_expenses():
    expenses = db["expenses"].find()
    return jsonify([{
        "description": expense["description"],
        "amount": expense["amount"],
        "created_at": expense["created_at"]
    } for expense in expenses])

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5004)
