from pymongo import MongoClient

def get_database():
    try:
        client = MongoClient("mongodb://localhost:27017/") 
        db = client["your_database_name"]  
        return db
    except Exception as e:
        print(f"Database connection error: {e}")
        return None
