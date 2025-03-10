import os
from dotenv import load_dotenv
import mysql.connector
from flask import Flask, jsonify, request
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


@app.route("/get", methods=["GET"])
def get():
    connection = db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notes ")
    result_query = cursor.fetchall()
    
    return(jsonify(result_query))

@app.route("/delete/<nrNote>", methods=["DELETE"])
def delete_note(nrNote):
    connection = db_connection()
    cursor = connection.cursor()
    query = """DELETE FROM notes WHERE Nr = %s"""
    cursor.execute(query, (nrNote,))
    connection.commit()

    return jsonify({"response": f"The note {nrNote} was delete"})

@app.route("/put", methods=["PUT"])
def update_note():
    data = request.get_json()
    title = data.get("title")
    note = data.get("note")
    nr = data.get("nr")

    connection = db_connection()
    cursor = connection.cursor()
    query = """UPDATE notes SET Title = %s, Note = %s WHERE Nr = %s"""
    cursor.execute(query, (title, note, nr,))
    connection.commit()

    return jsonify({"response": f"The note {nr} was update"})

if __name__ == "__main__":
    app.run(port=5001)