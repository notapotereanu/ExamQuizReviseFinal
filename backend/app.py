from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
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

@app.route('/search', methods=['GET'])
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

@app.route('/leaderboard', methods=['GET'])
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

if __name__ == '__main__':
    app.run(debug=True)