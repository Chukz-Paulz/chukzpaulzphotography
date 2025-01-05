from flask import Flask, request, jsonify
from db_config import get_database
import cloudinary
import cloudinary.uploader

app = Flask(__name__)
db = get_database()

# Configure Cloudinary
cloudinary.config(
    cloud_name="domehr0qc",
    api_key="375391317852181",
    api_secret="VPH6-prBE9RMkN4SA-WwHhsH9WI"
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