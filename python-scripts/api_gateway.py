from flask import Flask, request, jsonify, redirect

app = Flask(__name__)

# Redirect routes to respective microservices
@app.route('/book', methods=['POST'])
def redirect_booking():
    return redirect("http://localhost:5001/book", code=307)

@app.route('/close_day', methods=['POST'])
def redirect_close_day():
    return redirect("http://localhost:5001/close_day", code=307)

@app.route('/upload_image', methods=['POST'])
def redirect_upload_image():
    return redirect("http://localhost:5002/upload_image", code=307)

@app.route('/get_images', methods=['GET'])
def redirect_get_images():
    return redirect("http://localhost:5002/get_images", code=307)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
