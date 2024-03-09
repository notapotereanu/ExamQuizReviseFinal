PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT,
  questionsIDTaken TEXT,
  questionsIDAttempted TEXT,
  questionsIDLiked TEXT,
  questionsIDDisliked TEXT,
  questionsIDStared TEXT
);

CREATE TABLE module (
  module_id INTEGER PRIMARY KEY,
  moduleType TEXT,
  title TEXT,
  description TEXT,
  linkToGithub TEXT,
  linkToSyllabus TEXT
);

CREATE TABLE questions (
  question_id INTEGER PRIMARY KEY,
  author_id INTEGER,
  module_id INTEGER,
  question TEXT,
  answers TEXT,
  difficulty INTEGER,
  linkToVideo TEXT,
  totalLikes INTEGER,
  totalDislikes INTEGER,
  totalAttempts INTEGER,
  totalSolvedTimes INTEGER,
  FOREIGN KEY (author_id) REFERENCES users (user_id),
  FOREIGN KEY (module_id) REFERENCES module (module_id)
);

CREATE TABLE quiz (
  quiz_id INTEGER PRIMARY KEY,
  module_id INTEGER,
  questionsPool TEXT,
  FOREIGN KEY (module_id) REFERENCES module (module_id)
);

CREATE TABLE mockArticles (
  articles_id INTEGER PRIMARY KEY,
  content TEXT
);

INSERT INTO users (user_id, username, password, questionsIDTaken, questionsIDAttempted, questionsIDLiked, questionsIDDisliked, questionsIDStared) VALUES
(1, 'Andrian', 'pass123', '[1,2]', '[1,2,3]', '[1]', '[]', '[2]'),
(2, 'Klara', 'pass123', '[1,2]', '[1,2,3]', '[1]', '[]', '[2]'),
(3, 'Rishab', 'pass123', '[1,2]', '[1,2,3]', '[1]', '[]', '[2]'),
(4, 'Bruce', 'pass123', '[1,2]', '[1,2,3]', '[1]', '[]', '[2]'),
(5, 'Abdul', 'pass456', '[2]', '[]', '[]', '[1]', '[]');

INSERT INTO module (module_id, moduleType, title, description, linkToGithub, linkToSyllabus) VALUES
(1, 'Math', 'Basic Math', 'This module covers basic mathematics.', 'http://github.com/mathmodule', 'http://example.com/syllabus/math'),
(2, 'Geography', 'World Capitals', 'Learn about different capitals around the world.', 'http://github.com/geographymodule', 'http://example.com/syllabus/geography');

INSERT INTO questions (question_id, author_id, module_id, question, answers, difficulty, linkToVideo, totalLikes, totalDislikes, totalAttempts, totalSolvedTimes) VALUES
(1, 1, 1, 'What is 2+2?', '{"correct":"4","options":["3","4","5"]}', 1, 'http://example.com/video/1', 10, 2, 15, 5),
(2, 2, 1, 'What is the capital of France?', '{"correct":"Paris","options":["Paris","London","Berlin"]}', 2, 'http://example.com/video/2', 20, 1, 20, 10),
(3, 3, 1, 'What is the capital of Germany?', '{"correct":"Berlin","options":["Paris","London","Berlin"]}', 2, 'http://example.com/video/3', 30, 3, 25, 15),
(4, 4, 1, 'What is the capital of Italy?', '{"correct":"Rome","options":["Paris","Rome","Berlin"]}', 2, 'http://example.com/video/4', 40, 4, 30, 20),
(5, 5, 1, 'What is the capital of Spain?', '{"correct":"Madrid","options":["Madrid","Rome","Berlin"]}', 2, 'http://example.com/video/5', 50, 5, 35, 25),
(6, 1, 1, 'What is the capital of Portugal?', '{"correct":"Lisbon","options":["Madrid","Rome","Lisbon"]}', 2, 'http://example.com/video/6', 60, 6, 40, 30),
(7, 2, 1, 'What is the capital of Greece?', '{"correct":"Athens","options":["Madrid","Athens","Lisbon"]}', 2, 'http://example.com/video/7', 70, 7, 45, 35),
(8, 3, 1, 'What is the capital of Belgium?', '{"correct":"Brussels","options":["Brussels","Athens","Lisbon"]}', 2, 'http://example.com/video/8', 80, 8, 50, 40),
(9, 3, 1, 'What is the capital of Netherlands?', '{"correct":"Amsterdam","options":["Brussels","Amsterdam","Lisbon"]}', 2, 'http://example.com/video/9', 90, 9, 55, 45),
(10, 2, 1, 'What is the capital of Denmark?', '{"correct":"Copenhagen","options":["Brussels","Copenhagen","Lisbon"]}', 2, 'http://example.com/video/10', 100, 10, 60, 50),
(11, 1, 1, 'What is the capital of Sweden?', '{"correct":"Stockholm","options":["Brussels","Stockholm","Lisbon"]}', 2, 'http://example.com/video/11', 110, 11, 65, 55),
(12, 2, 1, 'What is the capital of Norway?', '{"correct":"Oslo","options":["Brussels","Oslo","Lisbon"]}', 2, 'http://example.com/video/12', 120, 12, 70, 60),
(13, 3, 1, 'What is the capital of Finland?', '{"correct":"Helsinki","options":["Brussels","Helsinki","Lisbon"]}', 2, 'http://example.com/video/13', 130, 13, 75, 65),
(14, 3, 1, 'What is the capital of Ireland?', '{"correct":"Dublin","options":["Brussels","Dublin","Lisbon"]}', 2, 'http://example.com/video/14', 140, 14, 80, 70),
(15, 1, 1, 'What is the capital of Poland?', '{"correct":"Warsaw","options":["Brussels","Warsaw","Lisbon"]}', 2, 'http://example.com/video/15', 150, 15, 85, 75),
(16, 1, 1, 'What is the capital of Austria?', '{"correct":"Vienna","options":["Brussels","Vienna","Lisbon"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(17, 1, 1, 'What is the capital of Hungary?', '{"correct":"Budapest","options":["Brussels","Budapest","Lisbon"]}', 2, 'http://example.com/video/17', 170, 17, 95, 85);

INSERT INTO quiz (quiz_id, module_id, questionsPool) VALUES
(1, 1, '["1","2"]'),
(2, 2, '["2"]');

INSERT INTO mockArticles (articles_id, content) VALUES
(1, '{"title":"Sample Article", "body":"This is a sample article for demonstration."}');

COMMIT;