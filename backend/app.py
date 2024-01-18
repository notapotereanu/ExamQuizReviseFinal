from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('../database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return "Welcome to the Quiz App API!"

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return jsonify([dict(row) for row in users])

@app.route('/questions', methods=['GET'])
def get_questions():
    conn = get_db_connection()
    questions = conn.execute('SELECT * FROM questions').fetchall()
    conn.close()
    return jsonify([dict(row) for row in questions])

if __name__ == '__main__':
    app.run(debug=True)