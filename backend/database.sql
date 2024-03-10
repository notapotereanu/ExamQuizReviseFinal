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
  module_id TEXT PRIMARY KEY,
  module_name TEXT,
  module_level INTEGER,
  module_description TEXT,
  linkToSyllabus TEXT
);

CREATE TABLE questions (
  question_id INTEGER PRIMARY KEY,
  author_id INTEGER,
  module_id TEXT,
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
  module_id TEXT,
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

INSERT INTO module (module_id, module_name,module_level, module_description, linkToSyllabus) VALUES
('CM1020', 
'Discrete Mathematics', 
4,
'This module gives you the mathematical foundations you need to learn how to think abstractly and introduces you to many of the standard mathematical tools and models necessary to understand and design computational systems and algorithms. By taking this module you will learn a wide range of the mathematical concepts and techniques that underpin Computer Science. In particular, you will study number systems, special functions, graphing, linear algebra and basic concept of combinatorics and probability theory', 
'https://d3c33hcgiwev3.cloudfront.net/91YaKqD2Q9-pBzenQI6ZaQ_2269995a648940c58bc1204cb2830ce1_CompMathSyllabus.pdf?Expires=1710201600&Signature=Udhmr-EkdZYXWmmC6GNnYwa-YSS-OcTtj6nK-ed~DLJ4zV~q-MsXkKAVGQHnUrUNK7tn3CqLDcC3kQX77itqj-UFZTL8aYSeXewiVw1B3Cm1HhsK7eq53lwq7UjKOk7Ty~U4RMTJ0452L6PYMPgky89XsYGQbYyH-q~-7BlgvAc_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A'),
('CM1005', 
'Introduction to Programming I', 
4,
'This module is focused on basic programming techniques. By taking this module, learners will learn how to use the basic elements of computer programming such as variables, conditionals, functions and loops. They will also be introduced to basic object- oriented programming techniques and learn how to create interactive, graphical computer programs.', 
'https://d3c33hcgiwev3.cloudfront.net/Ww22zekOEembNwq8zSOfag_f7154490dfd8445dbf12e2efa8d5634d_ITP1-Syllabus.pdf?Expires=1710201600&Signature=O-uNA5qdnPatT8iZlm7dZEpc6fJIrOOOqENV2xrrYsE8k2yQfNHAQiv~euPMYl-E4AJfxiUavs6cZnbraH~VsKlLvwNYPwrJSoL~8H93EztHwlRkhOkLNgHwJKbzJIy6HxYKIV3qM7bO4eVtvHKhewUSE73dOq5ODGbt16Lo8c8_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A'),
('CM1025', 
'Fundamentals of Computer Science', 
4,
'Upon successful completion of this module, you will be able to: Understand the core concepts that underpin modern computer science. Explain, describe and employ different techniques in both a theoretical and practical way. Appreciate how more complex techniques employ the fundamentals that are covered in this course.', 
'https://d3c33hcgiwev3.cloudfront.net/csbArOkPEemItBI1qPUVYg_09e464de3c1143a2a9132200891cdd3c_FCS-Syllabus.pdf?Expires=1710201600&Signature=GFaQ-YxoZ55psdZHZf1GeICUd11DLCaLFRId6y4GcW8-QtTLSaCpz8zZVEVs6iseWgB51n98HWfsv1IKhVxEVZBhSxmfaRogi5zIO3mtzF3BR3y7gyuNN7RCFQQkm2zdy0X9Mji3WBwGKtisLLdaz-UVJAQCqmw9ISIkK01acBg_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A'),
('CM2015', 
'Programming with Data', 
5,
'This module will show you how to work with data: getting data from a variety of sources, visualising data in compelling, informative ways, processing data to make it useful and shareable, and reasoning with data to test assumptions and explore the complexity of rich datasets. The module will also introduce you to a new language and programming environment that is well-adapted for these applications – Python.', 
'https://d3c33hcgiwev3.cloudfront.net/vfIkoXxFT-OyJKF8Rd_jpg_449d4ac3d5f74f319577ecdac0aba996_programmingWithDataSyllabus-1-.pdf?Expires=1710201600&Signature=NCLe9oDrRsVb3Of3Kr776ET559~mkjgskBszuhn8Ig1RCewrd9S70daNvZu4UH9-8gh39766zO4LIY13PQYYmQfVjIf2Tg2qRyxgY7TUTaPI~1S-ikxtTOxKHJtNqgqdxj33f6Sp6bn~gDPqhkPnxzpudqCaE-tmO1oNVXvKyP8_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A'),
('CM2005', 
'Object Oriented Programming', 
5,
'There are several programming paradigms in computer science. One of the most important, especially when creating large software projects, is object-oriented programming, or OOP. OOP allows the integration of data and processes on that data into discrete software modules. Learning about OOP will allow you to develop more modularised, more complex software designs. It will also let you understand better how many existing software libraries and systems have been designed. In the later stages of the programme, OOP is used extensively.', 
'https://d3c33hcgiwev3.cloudfront.net/Er3JTvI4Tlq9yU7yOP5a1A_c1ee8e2ce4a94c79b8385ea967f94059_ASP_syllabus.pdf?Expires=1710115200&Signature=TzvxR7XMoQpeCj75kRX3FJ8iieSnyvLfl0Ox1hmMxsHtf0CTFgLfEYyYVjJ-QE3o~ntWJu2xno9FrQ9VVUa8pq2fnHrdSA4Dc7jiUs7wcVvuVFbPJO4YwH6s1Iu4KRD1a7hLBUSaUSnZ0if7DpVmi585gP5pJhuJ8gNjuKUZHWo_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A'),
('CM2040', 
'Databases, Networks and the Web', 
5,
'Many computer systems involve networks of computers interacting with each other to deliver coherent, integrated services such as banking, shopping and social media. A vital element of these services is how they represent, store and access data. This module provides practical and theoretical skills which will enable you to reason about networked systems and use them to create coherent services such as data- driven web applications. These skills build on the computing and web fundamentals taught earlier in the programme, and will allow you to work on more advanced data and web systems later in the programme.', 
'https://d3c33hcgiwev3.cloudfront.net/g2lqekRNSmypanpETfpsMg_c00b9c1f57884860a7fbc1d2ca630eca_CM2040_Databases-networks-and-the-web-Syllabus.pdf?Expires=1710201600&Signature=AKBIYtMktHH1f-yGkOe00AWvfJN7Qa35Ra20zzlyzPm282pQKjyUHPzPxu3ZruRhSwj6TSB7R3AZlqtPxE5QoiLEFNBiDHzxI307QP0PE~ukVWXoztKQSnXTgExCgbbuKjLuI9PWk05VxgSLlpHl3m~n3-5tYXLPbVJgGo5uPsM_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A');

INSERT INTO questions (question_id, author_id, module_id, question, answers, difficulty, linkToVideo, totalLikes, totalDislikes, totalAttempts, totalSolvedTimes) VALUES
(1, 1,  'CM1020', 'What is 2+2?', '{"correct":"4","options":["3","4","5"]}', 1, 'http://example.com/video/1', 10, 2, 15, 5),
(2, 2,  'CM1020', 'What is the capital of France?', '{"correct":"Paris","options":["Paris","London","Berlin"]}', 2, 'http://example.com/video/2', 20, 1, 20, 10),
(3, 3,  'CM1020', 'What is the capital of Germany?', '{"correct":"Berlin","options":["Paris","London","Berlin"]}', 2, 'http://example.com/video/3', 30, 3, 25, 15),
(4, 4,  'CM1020', 'What is the capital of Italy?', '{"correct":"Rome","options":["Paris","Rome","Berlin"]}', 2, 'http://example.com/video/4', 40, 4, 30, 20),
(5, 5,  'CM1020', 'What is the capital of Spain?', '{"correct":"Madrid","options":["Madrid","Rome","Berlin"]}', 2, 'http://example.com/video/5', 50, 5, 35, 25),
(6, 1,  'CM1020', 'What is the capital of Portugal?', '{"correct":"Lisbon","options":["Madrid","Rome","Lisbon"]}', 2, 'http://example.com/video/6', 60, 6, 40, 30),
(7, 2,  'CM1020', 'What is the capital of Greece?', '{"correct":"Athens","options":["Madrid","Athens","Lisbon"]}', 2, 'http://example.com/video/7', 70, 7, 45, 35),
(8, 3,  'CM1020', 'What is the capital of Belgium?', '{"correct":"Brussels","options":["Brussels","Athens","Lisbon"]}', 2, 'http://example.com/video/8', 80, 8, 50, 40),
(9, 3,  'CM1020', 'What is the capital of Netherlands?', '{"correct":"Amsterdam","options":["Brussels","Amsterdam","Lisbon"]}', 2, 'http://example.com/video/9', 90, 9, 55, 45),
(10, 2, 'CM1020', 'What is the capital of Denmark?', '{"correct":"Copenhagen","options":["Brussels","Copenhagen","Lisbon"]}', 2, 'http://example.com/video/10', 100, 10, 60, 50),
(11, 1, 'CM1020', 'What is the capital of Sweden?', '{"correct":"Stockholm","options":["Brussels","Stockholm","Lisbon"]}', 2, 'http://example.com/video/11', 110, 11, 65, 55),
(12, 2, 'CM1020', 'What is the capital of Norway?', '{"correct":"Oslo","options":["Brussels","Oslo","Lisbon"]}', 2, 'http://example.com/video/12', 120, 12, 70, 60),
(13, 3, 'CM1020', 'What is the capital of Finland?', '{"correct":"Helsinki","options":["Brussels","Helsinki","Lisbon"]}', 2, 'http://example.com/video/13', 130, 13, 75, 65),
(14, 3, 'CM1020', 'What is the capital of Ireland?', '{"correct":"Dublin","options":["Brussels","Dublin","Lisbon"]}', 2, 'http://example.com/video/14', 140, 14, 80, 70),
(15, 1, 'CM1020', 'What is the capital of Poland?', '{"correct":"Warsaw","options":["Brussels","Warsaw","Lisbon"]}', 2, 'http://example.com/video/15', 150, 15, 85, 75),
(16, 1, 'CM1020', 'What is the capital of Austria?', '{"correct":"Vienna","options":["Brussels","Vienna","Lisbon"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(17, 1, 'CM1020', 'What is the capital of Hungary?', '{"correct":"Budapest","options":["Brussels","Budapest","Lisbon"]}', 2, 'http://example.com/video/17', 170, 17, 95, 85);

INSERT INTO quiz (quiz_id, module_id, questionsPool) VALUES
(1, 'CM1020', '["1","2"]'),
(2, 'CM2015', '["2"]');

INSERT INTO mockArticles (articles_id, content) VALUES
(1, '{"title":"Sample Article", "body":"This is a sample article for demonstration."}');

COMMIT;