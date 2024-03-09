from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = 'oidsbviowebv80q28niosn3fc23vc32c'  # Change this to a random secret key
jwt = JWTManager(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return "Welcome to the Quiz App API!"

@app.route('/api/getusers', methods=['GET'])
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return jsonify([dict(row) for row in users])

@app.route('/api/questions', methods=['GET'])
def get_questions():
    conn = get_db_connection()
    questions = conn.execute('SELECT * FROM questions').fetchall()
    conn.close()
    return jsonify([dict(row) for row in questions])

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query', '')  # Get the search query from URL parameters
    conn = get_db_connection()

    # Search for users
    users = conn.execute('SELECT * FROM users WHERE username LIKE ?', ('%' + query + '%',)).fetchall()

    # Search for quizzes by module title
    quizzes = conn.execute('SELECT * FROM module WHERE title LIKE ?', ('%' + query + '%',)).fetchall()

    conn.close()

    # Combine results into a single JSON response
    return jsonify({
        'users': [dict(row) for row in users],
        'quizzes': [dict(row) for row in quizzes]
    })

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    conn = get_db_connection()

    # get the top five users with most questions written
    leaderboard_query = '''
    SELECT u.username, COUNT(q.question_id) as question_count
    FROM users u
    JOIN questions q ON u.user_id = q.author_id
    GROUP BY u.user_id
    ORDER BY question_count DESC
    LIMIT 5
    '''

    leaderboard_results = conn.execute(leaderboard_query).fetchall()
    conn.close()

    # Format the results into a list of dictionaries
    leaderboard_data = [{'username': row['username'], 'question_count': row['question_count']} for row in leaderboard_results]

    return jsonify(leaderboard_data)

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')  # Capture the email from the request
    password = data.get('password')  # Password is taken directly without hashing

    # Input validation checks should go here (e.g., ensure username, email, and password are not empty)

    conn = get_db_connection()
    # Check if username or email already exists to prevent duplicates
    user_or_email_exists = conn.execute('SELECT 1 FROM users WHERE username = ? OR email = ?', (username, email)).fetchone() is not None
    if user_or_email_exists:
        conn.close()
        return jsonify({"error": "Username or Email already exists"}), 409  # Conflict status code

    # Insert new user into the database with the plain password
    conn.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
    conn.commit()
    conn.close()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()

    if user is not None and user['password'] == password:
        access_token = create_access_token(identity=username)
        user_id = user["user_id"]
        return jsonify(access_token=access_token,user_id=user_id), 200
    else:
        # Authentication failed
        return jsonify({"error": "Invalid username or password"}), 401

@app.route('/api/user/public-profile/<int:user_id>', methods=['GET'])
def get_public_profile(user_id):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE user_id = ?', (user_id,)).fetchone()
    conn.close()
    if user:
        return jsonify({
            "username": user["username"],
            "email": user["email"],    
            "questionsIDTaken": user["questionsIDTaken"],
            "questionsIDAttempted": user["questionsIDAttempted"],
            "questionsIDLiked": user["questionsIDLiked"],
            "questionsIDDisliked": user["questionsIDDisliked"],
            "questionsIDStared": user["questionsIDStared"]
        })
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user = get_jwt_identity()
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE /api/user/profile = ?', (current_user,)).fetchone()
    conn.close()
    if user:
        return jsonify({
            "username": user["username"],
            "email": user["email"],
            "password": user["password"],
            "questionsIDTaken": user["questionsIDTaken"],
            "questionsIDAttempted": user["questionsIDAttempted"],
            "questionsIDLiked": user["questionsIDLiked"],
            "questionsIDDisliked": user["questionsIDDisliked"],
            "questionsIDStared": user["questionsIDStared"]
        })
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)