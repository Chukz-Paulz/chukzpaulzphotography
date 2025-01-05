from flask import Flask, request, jsonify
from db_config import get_database
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os
import cloudinary

app = Flask(__name__)
db = get_database()
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@app.route('/upload_image', methods=['POST'])
def upload_image():
    file = request.files['file']
    genre = request.form['genre']

    upload_result = cloudinary.uploader.upload(file)
    db["gallery"].insert_one({"url": upload_result['url'], "genre": genre})

    return jsonify({"message": "Image uploaded successfully!"})

@app.route('/get_images', methods=['GET'])
def get_images():
    genre = request.args.get("genre")
    images = db["gallery"].find({"genre": genre})
    return jsonify([{"url": img["url"], "genre": img["genre"]} for img in images])

if __name__ == '__main__':
    app.run(port=5002)
