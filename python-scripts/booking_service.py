from flask import Flask, request, jsonify
from db_config import get_database
from datetime import datetime

app = Flask(__name__)
db = get_database()
bookings_collection = db["bookings"]

@app.route('/book', methods=['POST'])
def book_shoot():
    data = request.json
    location = data.get("location")
    date = data.get("date")
    user_details = data.get("user_details")
    
    # Check if the date is already closed for the branch
    closed_days = db["closed_days"].find_one({"location": location, "date": date})
    if closed_days:
        return jsonify({"message": "Selected date is fully booked!"}), 400
    
    # Save booking to database
    booking = {
        "user_details": user_details,
        "location": location,
        "date": date,
        "created_at": datetime.now()
    }
    bookings_collection.insert_one(booking)
    return jsonify({"message": "Booking successful!"}), 201

@app.route('/close_day', methods=['POST'])
def close_day():
    data = request.json
    location = data.get("location")
    date = data.get("date")
    db["closed_days"].insert_one({"location": location, "date": date})
    return jsonify({"message": "Day successfully closed for booking!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
