import os
from dotenv import load_dotenv
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask (__name__)
CORS(app, origins=["http://localhost:5173"])


load_dotenv(".env")

def db_connection():
    try:
        return mysql.connector.connect(
            host = "localhost",
            user = os.getenv("my_user"),
            password = os.getenv("my_password"),
            database = os.getenv("my_database")
        )

    except mysql.connector.Error as err:
        print("Cannot connect do databases", err)


@app.route("/")
def get():
    connection = db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notes ")
    result_query = cursor.fetchall()
    
    return(jsonify(result_query))



if __name__ == "__main__":
    app.run(port=5001)