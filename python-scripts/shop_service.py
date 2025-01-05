from flask import Flask, request, jsonify
from db_config import get_database

app = Flask(__name__)
db = get_database()
products_collection = db["products"]
orders_collection = db["orders"]

@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.json
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    stock = data.get("stock")
    image_url = data.get("image_url")

    product = {
        "name": name,
        "description": description,
        "price": price,
        "stock": stock,
        "image_url": image_url,
        "created_at": datetime.now()
    }
    products_collection.insert_one(product)
    return jsonify({"message": "Product added successfully!"}), 201

@app.route('/get_products', methods=['GET'])
def get_products():
    products = products_collection.find()
    return jsonify([{
        "id": str(product["_id"]),
        "name": product["name"],
        "description": product["description"],
        "price": product["price"],
        "stock": product["stock"],
        "image_url": product["image_url"]
    } for product in products])

@app.route('/place_order', methods=['POST'])
def place_order():
    data = request.json
    user_details = data.get("user_details")
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    product = products_collection.find_one({"_id": ObjectId(product_id)})

    if not product or product["stock"] < quantity:
        return jsonify({"message": "Product not available or insufficient stock!"}), 400

    # Reduce stock
    products_collection.update_one(
        {"_id": ObjectId(product_id)},
        {"$inc": {"stock": -quantity}}
    )

    # Save order
    order = {
        "user_details": user_details,
        "product_id": product_id,
        "quantity": quantity,
        "total_price": product["price"] * quantity,
        "created_at": datetime.now()
    }
    orders_collection.insert_one(order)
    return jsonify({"message": "Order placed successfully!"}), 201

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5003)
