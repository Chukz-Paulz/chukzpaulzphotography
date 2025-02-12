from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
GENRE_FILE = 'genres.json'  # Store genres here
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load genres or initialize if not present
if not os.path.exists(GENRE_FILE):
    with open(GENRE_FILE, 'w') as f:
        json.dump([], f)

def load_genres():
    with open(GENRE_FILE, 'r') as f:
        return json.load(f)

def save_genres(genres):
    with open(GENRE_FILE, 'w') as f:
        json.dump(genres, f)

@app.route('/upload_image', methods=['POST'])
def upload_image():
    file = request.files.get('file')
    genre = request.form.get('genre', 'uncategorized')

    if not file:
        return jsonify({"message": "No file provided"}), 400

    # Save the genre if it's new
    genres = load_genres()
    if genre not in genres:
        genres.append(genre)
        save_genres(genres)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    return jsonify({"url": f"http://127.0.0.1:5000/uploads/{file.filename}", "genre": genre})

@app.route('/get_images', methods=['GET'])
def get_images():
    genre = request.args.get('genre', '')
    images = []

    for filename in os.listdir(UPLOAD_FOLDER):
        if genre in filename or not genre:
            images.append({"url": f"http://127.0.0.1:5000/uploads/{filename}", "genre": genre})

    return jsonify(images)

@app.route('/genres', methods=['GET'])
def get_genres():
    return jsonify(load_genres())

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(port=5000)
