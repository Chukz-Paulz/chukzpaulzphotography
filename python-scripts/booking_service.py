from flask import Flask, request, jsonify
from db_config import get_database
from datetime import datetime
import logging

app = Flask(__name__)
db = get_database()
bookings_collection = db["bookings"]

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/book', methods=['POST'])
def book_shoot():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "Request body is missing!"}), 400

        location = data.get("location")
        date = data.get("date")
        user_details = data.get("user_details")

        # Validate inputs
        if not location or not date or not user_details:
            return jsonify({"message": "Location, date, and user details are required!"}), 400

        # Validate date format
        try:
            booking_date = datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            return jsonify({"message": "Invalid date format! Use YYYY-MM-DD."}), 400

        # Check if the date is already closed for the branch
        closed_days = db["closed_days"].find_one({"location": location, "date": date})
        if closed_days:
            return jsonify({"message": "Selected date is fully booked!"}), 400

        # Prevent duplicate bookings
        existing_booking = bookings_collection.find_one({
            "user_details.email": user_details.get("email"),  # Assuming email is unique
            "location": location,
            "date": date
        })
        if existing_booking:
            return jsonify({"message": "You already have a booking for this date and location!"}), 400

        # Save booking to database
        booking = {
            "user_details": user_details,
            "location": location,
            "date": date,
            "created_at": datetime.now()
        }
        bookings_collection.insert_one(booking)
        return jsonify({"message": "Booking successful!"}), 201

    except Exception as e:
        logging.error(f"Error processing booking: {str(e)}")
        return jsonify({"message": "An error occurred while processing the booking."}), 500

@app.route('/close_day', methods=['POST'])
def close_day():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "Request body is missing!"}), 400

        location = data.get("location")
        date = data.get("date")

        # Validate inputs
        if not location or not date:
            return jsonify({"message": "Location and date are required!"}), 400

        # Validate date format
        try:
            close_date = datetime.strptime(date, "%Y-%m-%d")
        except ValueError:
            return jsonify({"message": "Invalid date format! Use YYYY-MM-DD."}), 400

        # Save closed day to database
        db["closed_days"].insert_one({"location": location, "date": date})
        return jsonify({"message": "Day successfully closed for booking!"})

    except Exception as e:
        logging.error(f"Error closing day: {str(e)}")
        return jsonify({"message": "An error occurred while closing the day."}), 500

# New endpoint to get all bookings
@app.route('/bookings', methods=['GET'])
def get_bookings():
    try:
        bookings = bookings_collection.find()
        bookings_list = [{"location": booking["location"], "date": booking["date"], "user_details": booking["user_details"]} for booking in bookings]
        return jsonify(bookings_list)
    except Exception as e:
        logging.error(f"Error fetching bookings: {str(e)}")
        return jsonify({"message": "An error occurred while fetching bookings."}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
