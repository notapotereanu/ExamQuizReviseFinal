import unittest
from flask_testing import TestCase
from app import app, get_db_connection
from unittest.mock import patch, MagicMock
import json 

# Mock data for testing
mock_users = [
    {'id': 1, 'username': 'testuser1', 'email': 'test1@example.com'},
    {'id': 2, 'username': 'testuser2', 'email': 'test2@example.com'}
]

mock_questions = [
    {'id': 1, 'question': 'What is Python?', 'author_id': 1},
    {'id': 2, 'question': 'What is Flask?', 'author_id': 1}
]

class TestAPI(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = False
        return app

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Welcome to the Quiz App API!', response.data.decode())

    @patch('app.get_db_connection')
    def test_get_users(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = mock_users
        mock_conn.execute.return_value = mock_cursor
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/getusers')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), len(mock_users))
        for user in response.json:
            self.assertIn(user['username'], [u['username'] for u in mock_users])

    @patch('app.get_db_connection')
    def test_get_questions(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = mock_questions
        mock_conn.execute.return_value = mock_cursor
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/questions')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), len(mock_questions))
        for question in response.json:
            self.assertIn(question['question'], [q['question'] for q in mock_questions])

    @patch('app.get_db_connection')
    def test_search(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_cursor_users = MagicMock()
        mock_cursor_quizzes = MagicMock()
        mock_cursor_users.fetchall.return_value = mock_users
        mock_cursor_quizzes.fetchall.return_value = []  # Assume no quizzes for simplicity
        mock_conn.execute.side_effect = [mock_cursor_users, mock_cursor_quizzes]
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/search?query=test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['users']), len(mock_users))
        self.assertEqual(len(response.json['quizzes']), 0)  # No quizzes in mock data

    @patch('app.get_db_connection')
    def test_leaderboard(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        # Mock leaderboard data
        mock_leaderboard_data = [
            {'username': 'user1', 'question_count': 5},
            {'username': 'user2', 'question_count': 3},
        ]
        mock_cursor.fetchall.return_value = mock_leaderboard_data
        mock_conn.execute.return_value = mock_cursor
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/leaderboard')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), len(mock_leaderboard_data))
        for index, data in enumerate(response.json):
            self.assertEqual(data['username'], mock_leaderboard_data[index]['username'])
            self.assertEqual(data['question_count'], mock_leaderboard_data[index]['question_count'])

    @patch('app.get_db_connection')
    def test_register_user_success(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchone.return_value = None  # Simulate no existing user
        mock_conn.execute.return_value = mock_cursor
        mock_get_db_connection.return_value = mock_conn

        test_user_data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password"
        }

        response = self.client.post('/api/register', json=test_user_data)
        self.assertEqual(response.status_code, 201)
        self.assertIn("User registered successfully", response.json['message'])

    @patch('app.get_db_connection')
    def test_register_user_failure_already_exists(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchone.return_value = True  # Simulate existing user or email
        mock_conn.execute.return_value = mock_cursor
        mock_get_db_connection.return_value = mock_conn

        test_user_data = {
            "username": "existinguser",
            "email": "existinguser@example.com",
            "password": "password"
        }

        response = self.client.post('/api/register', json=test_user_data)
        self.assertEqual(response.status_code, 409)
        self.assertIn("Username or Email already exists", response.json['error'])

    @patch('app.get_db_connection')
    def test_random_module(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_conn.execute.return_value.fetchone.return_value = {'module_id': 1}
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/random_module')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['module_id'], 1)

    @patch('app.get_db_connection')
    def test_login(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_conn.execute.return_value.fetchone.return_value = {'username': 'testuser', 'password': 'testpass', 'user_id': 1}
        mock_get_db_connection.return_value = mock_conn

        response = self.client.post('/api/login', json={'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.json)
   
    @patch('app.get_db_connection')
    def test_update_user(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_conn.execute.return_value.rowcount = 1  # Simulate successful update
        mock_get_db_connection.return_value = mock_conn
    
        response = self.client.post('/api/update_user', json={'user_id': 1, 'email': 'new@example.com', 'password': 'newpass'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('User updated successfully', response.json['message'])

    @patch('app.get_db_connection')
    def test_get_modules(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_conn.execute.return_value.fetchall.return_value = [{'module_id': 1, 'module_name': 'Module 1'}]
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/modules')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['modules']), 1)
        self.assertEqual(response.json['modules'][0]['module_name'], 'Module 1')

    @patch('app.get_db_connection')
    def test_get_questions_details(self, mock_get_db_connection):
        # Setup mock data
        mock_conn = MagicMock()
        user_profile = {'user_id': 1, 'questionsIDAttempted': '[]', 'questionsIDTaken': '[]', 'questionsIDLiked': '[]', 'questionsIDDisliked': '[]', 'questionsIDStared': '[]'}
        mock_conn.execute.return_value.fetchone.return_value = user_profile
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/get_questions_details/1')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    @patch('app.get_db_connection')
    def test_add_question(self, mock_get_db_connection):
        mock_conn = MagicMock()
        mock_conn.execute.return_value.rowcount = 1
        mock_get_db_connection.return_value = mock_conn

        data = {
            'question': 'Sample Question',
            'author_id': 1,
            'module_id': 1,
            'correctAnswer': 'Correct',
            'answers': json.dumps(['Correct', 'Wrong1', 'Wrong2']),
            'difficulty': 'basic'
        }
        response = self.client.post('/api/add-question', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('Question added successfully', response.json['message'])

    @patch('app.get_db_connection')
    def test_get_module_details(self, mock_get_db_connection):
        mock_conn = MagicMock()
        module_details = {'module_id': 1, 'module_name': 'Test Module'}
        mock_conn.execute.return_value.fetchone.return_value = module_details
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/modules/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['module_name'], 'Test Module')

    @patch('app.get_db_connection')
    def test_get_question_details(self, mock_get_db_connection):
        mock_conn = MagicMock()
        question_details = {'question_id': 1, 'question': 'What is Flask?', 'answers': '{}', 'difficulty': 1}
        mock_conn.execute.return_value.fetchone.return_value = question_details
        mock_get_db_connection.return_value = mock_conn

        response = self.client.get('/api/get_question_details/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('What is Flask?', response.json['question'])

if __name__ == '__main__':
    unittest.main()
