from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Enable CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Base URLs of microservices
BOOKING_SERVICE_URL = "http://localhost:5001"
IMAGE_SERVICE_URL = "http://localhost:5002"

# Forward booking requests
@app.route('/book', methods=['POST'])
def forward_booking():
    response = requests.post(f"{BOOKING_SERVICE_URL}/book", json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/close_day', methods=['POST'])
def forward_close_day():
    response = requests.post(f"{BOOKING_SERVICE_URL}/close_day", json=request.json)
    return jsonify(response.json()), response.status_code

# Forward image upload
@app.route('/upload_image', methods=['POST'])
def forward_upload_image():
    files = {"file": request.files["file"]}
    data = {"genre": request.form["genre"]}
    response = requests.post(f"{IMAGE_SERVICE_URL}/upload_image", files=files, data=data)
    return jsonify(response.json()), response.status_code

# Fetch images
@app.route('/get_images', methods=['GET'])
def forward_get_images():
    genre = request.args.get("genre")
    response = requests.get(f"{IMAGE_SERVICE_URL}/get_images", params={"genre": genre})
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
