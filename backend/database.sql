PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY,
  username TEXT,
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
(2, 2, 1, 'What is the capital of France?', '{"correct":"Paris","options":["Paris","London","Berlin"]}', 2, 'http://example.com/video/2', 20, 1, 20, 10);

INSERT INTO quiz (quiz_id, module_id, questionsPool) VALUES
(1, 1, '["1","2"]'),
(2, 2, '["2"]');

INSERT INTO mockArticles (articles_id, content) VALUES
(1, '{"title":"Sample Article", "body":"This is a sample article for demonstration."}');

COMMIT;