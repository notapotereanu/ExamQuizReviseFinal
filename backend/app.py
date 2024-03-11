from flask import Flask, jsonify, request
import sqlite3
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = 'oidsbviowebv80q28niosn3fc23vc32c'  
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
    query = request.args.get('query', '')  
    conn = get_db_connection()

    users = conn.execute('SELECT * FROM users WHERE username LIKE ?', ('%' + query + '%',)).fetchall()

    quizzes = conn.execute('SELECT * FROM module WHERE module_name LIKE ?', ('%' + query + '%',)).fetchall()

    conn.close()

    return jsonify({
        'users': [dict(row) for row in users],
        'quizzes': [dict(row) for row in quizzes]
    })

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    conn = get_db_connection()

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

    leaderboard_data = [{'username': row['username'], 'question_count': row['question_count']} for row in leaderboard_results]

    return jsonify(leaderboard_data)

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email') 
    password = data.get('password')
    
    conn = get_db_connection()
    user_or_email_exists = conn.execute('SELECT 1 FROM users WHERE username = ? OR email = ?', (username, email)).fetchone() is not None
    if user_or_email_exists:
        conn.close()
        return jsonify({"error": "Username or Email already exists"}), 409 

    conn.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
    conn.commit()
    conn.close()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/random_module')
def random_module():
    conn = get_db_connection()
    module = conn.execute('SELECT module_id FROM module ORDER BY RANDOM() LIMIT 1').fetchone()
    conn.close()
    if module:
        return jsonify(module_id=module['module_id'])
    else:
        return jsonify(message="No modules found"), 404

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
    user = conn.execute('SELECT * FROM users WHERE username = ?', (current_user,)).fetchone()
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

@app.route('/api/modules', methods=['GET'])
def get_modules():
    conn = get_db_connection()
    modules = conn.execute('SELECT * FROM module').fetchall()
    conn.close()

    modules_list = [dict(module) for module in modules]

    return jsonify(modules=modules_list)

@app.route('/api/update_user', methods=['POST'])
def update_user():
    data = request.get_json()
    user_id = data.get('user_id')
    email = data.get('email')
    new_password = data.get('password')
    conn = get_db_connection()

    try:
        conn.execute('UPDATE users SET email = ?, password = ? WHERE user_id = ?', (email, new_password, user_id))
        conn.commit()
    except sqlite3.Error as e:
        conn.close()
        return jsonify({"error": "Database error", "message": str(e)}), 500

    conn.close()
    return jsonify({"message": "User updated successfully"}), 200

@app.route('/api/get_questions_details/<int:user_id>')
def get_questions_details(user_id):
    conn = get_db_connection()

    user_profile = conn.execute('SELECT * FROM users WHERE user_id = ?', (user_id,)).fetchone()

    if not user_profile:
        return jsonify({"error": "User not found"}), 404

    userData = {
        'questionsIDAttempted': json.loads(user_profile['questionsIDAttempted']) if user_profile['questionsIDAttempted'] else [],
        'questionsIDTaken': json.loads(user_profile['questionsIDTaken']) if user_profile['questionsIDTaken'] else [],
        'questionsIDLiked': json.loads(user_profile['questionsIDLiked']) if user_profile['questionsIDLiked'] else [],
        'questionsIDDisliked': json.loads(user_profile['questionsIDDisliked']) if user_profile['questionsIDDisliked'] else [],
        'questionsIDStared': json.loads(user_profile['questionsIDStared']) if user_profile['questionsIDStared'] else [],
    }

    questionCategories = [
        {'title': 'Attempted Questions', 'data': userData.get('questionsIDAttempted', [])},
        {'title': 'Taken Questions', 'data': userData.get('questionsIDTaken', [])},
        {'title': 'Liked Questions', 'data': userData.get('questionsIDLiked', [])},
        {'title': 'Disliked Questions', 'data': userData.get('questionsIDDisliked', [])},
        {'title': 'Starred Questions', 'data': userData.get('questionsIDStared', [])},
    ]

    for category in questionCategories:
        detailed_questions = []
        for question_id in category['data']:
            question_details = conn.execute('SELECT question, question_id FROM questions WHERE question_id = ?', (question_id,)).fetchone()
            if question_details:
                detailed_questions.append(dict(question_details))
        category['data'] = detailed_questions

    conn.close()

    return jsonify(questionCategories)

@app.route('/api/add-question', methods=['POST'])
def add_question():
    try:
        data = request.get_json()
        question = data['question']
        author_id = data['author_id']
        module_id = data['module_id']
        correctAnswer = data['correctAnswer']

        answers_list = json.loads(data.get('answers', '[]'))

        seen = set()
        options = [x for x in answers_list if not (x in seen or seen.add(x))]
        if correctAnswer not in options:
            options.append(correctAnswer)

        formatted_answers = json.dumps({"correct": correctAnswer, "options": options})

        difficulty_levels = {
            'basic': 1,
            'intermediate': 2,
            'advanced': 3
        }
        difficulty = difficulty_levels.get(data.get('difficulty'), 1)

        conn = get_db_connection()
        conn.execute('INSERT INTO questions (question, author_id, module_id, answers, difficulty) VALUES (?, ?, ?, ?, ?)', 
                     (question, author_id, module_id, formatted_answers, difficulty))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Question added successfully'}), 201
    except Exception as e:
        print(e)  
        return jsonify({'error': 'Failed to add question'}), 500

@app.route('/api/modules/<module_id>', methods=['GET'])
def get_module_details(module_id):
    conn = get_db_connection()
    module = conn.execute('SELECT * FROM module WHERE module_id = ?', (module_id,)).fetchone()
    conn.close()

    if module is not None:
        module_details = dict(module)
        return jsonify(module_details)
    else:
        return jsonify({'error': 'Module not found'}), 404

@app.route('/api/get_question_details/<int:question_id>', methods=['GET'])
def get_question_details(question_id):
    conn = get_db_connection()
    question = conn.execute('SELECT * FROM questions WHERE question_id = ?', (question_id,)).fetchone()
    conn.close()

    if question is not None:
        question_details = {key: question[key] for key in question.keys()}
        return jsonify(question_details)
    else:
        return jsonify({'error': 'Question not found'}), 404

@app.route('/questions/<module_id>/<int:difficulty>')
def get_questions_by_module_id_and_difficulty(module_id, difficulty):
    conn = get_db_connection()
    questions = conn.execute('''
    SELECT question_id, question,question,answers,linkToVideo, totalLikes, totalDislikes, totalAttempts, totalSolvedTimes FROM questions
    WHERE module_id = ? AND difficulty = ?
    ''', (module_id, difficulty)).fetchall()
    conn.close()

    questions_list = [dict(question) for question in questions]
    return jsonify(questions_list)

if __name__ == '__main__':
    app.run(debug=True)