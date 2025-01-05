from flask import Flask, request, jsonify
from generate_birthday_frame import create_frame

app = Flask(__name__)

@app.route('/generate-frame', methods=['POST'])
def generate_frame():
    data = request.json
    name = data.get('name')
    date_of_birth = data.get('dob')
    
    if not name or not date_of_birth:
        return jsonify({"error": "Name and DOB are required"}), 400

    try:
        frame_path = create_frame(name, date_of_birth)
        return jsonify({"message": "Frame generated", "frame_path": frame_path}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
