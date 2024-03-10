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
(1, 'demo', 'demo', '[1,2]', '[1,2,3]', '[1]', '[]', '[2]'),
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
(1, 1, 'CM1020', 'If set A = {2, 9, 5, 2}, then the number of subsets which can be formed from A is:', '{"correct":"3","options":["3","8","16","4"]}', 1, 'http://example.com/video/1', 10, 2, 15, 5),
(2, 2, 'CM1020', 'We have a class of 40 students. How many ways are there of choosing 2 representatives from the class to take part in a college committee?', '{"correct":"780","options":["1560","780","700","520"]}', 2, 'http://example.com/video/2', 20, 1, 20, 10),
(3, 3, 'CM1020', 'Which one of the following statements about a binary search tree is true?', '{"correct":"The right child is always lesser than its parent","options":["The left child is always greater than its parent","The left and right sub-trees are not necessarily binary search trees","The left and right sub-trees are also  binary search trees","The right child is always lesser than its parent"]}', 3, 'http://example.com/video/3', 30, 3, 25, 15),
(4, 4, 'CM1020', 'Which one of the following statements about a binary search  tree is NOT  true?', '{"correct":"Every non-root node has exactly one parent","options":["Every non-root node has exactly one parent","Every non-root node has exactly one parent","Every binary search tree has exactly one root element","Every binary search tree has exactly one root element","Every binary search tree has exactly one root element"]}', 1, 'http://example.com/video/4', 40, 4, 30, 20),
(5, 5, 'CM1020', 'What is the height of a binary search tree with 2,000 records?', '{"correct":"11","options":["10","20","11","15"]}', 2, 'http://example.com/video/5', 50, 5, 35, 25),
(6, 1, 'CM1020', 'What is the cardinality of the power set of a set with n elements?', '{"correct":"2^n","options":["2^n","n! (n factorial)","n^2","n"]}', 3, 'http://example.com/video/6', 60, 6, 40, 30),
(7, 2, 'CM1005', 'What is the purpose of a loop in programming?', '{"correct": "Integrated Development Environment", "options": ["Interactive Design Environment", "Integrated Development Environment", "Interface Development Engine", "Intelligent Design Engine"]}', 1, 'http://example.com/video/7', 70, 7, 45, 35),
(8, 3, 'CM1005', 'Which of the following is not a data type in programming?', '{"correct": "Alphabet", "options": ["Integer", "Boolean", "Alphabet", "Float"]}', 2, 'http://example.com/video/8', 80, 8, 50, 40),
(9, 3, 'CM1005', 'What does HTML stand for?', '{"correct": "HyperText Markup Language", "options": ["Hyperlink and Text Markup Language", "HyperText Markup Language", "High-Level Textual Markup Language", "Hyper Transferable Markup Language"]}', 3, 'http://example.com/video/9', 90, 9, 55, 45),
(10, 2, 'CM1005', 'What is the purpose of the "if" statement in programming?', '{"correct": "To perform conditional execution", "options": ["To define a function", "To declare a variable", "To perform conditional execution", "To create a loop"]}', 1, 'http://example.com/video/10', 100, 10, 60, 50),
(11, 1, 'CM1005', 'In programming, what is the significance of the "return" statement?', '{"correct": "To specify the output of a function", "options": ["To terminate the program", "To print output on the console", "To exit a loop", "To specify the output of a function"]}', 2, 'http://example.com/video/11', 110, 11, 65, 55),
(12, 2, 'CM1005', 'What is the purpose of the "else" statement in programming?', '{"correct": "To specify an alternative action if the condition of the preceding ''if'' statement is false", "options": ["To define a new function", "To print output on the console", "To create a loop", "To specify an alternative action if the condition of the preceding if statement is false"]}', 3, 'http://example.com/video/12', 120, 12, 70, 60),
(13, 3, 'CM1025', 'What is the primary purpose of an operating system?', '{"correct": "To manage computer hardware and provide services for computer programs", "options": ["To create user interfaces", "To develop software applications", "To manage computer hardware and provide services for computer programs", "To design computer networks"]}', 1, 'http://example.com/video/13', 130, 13, 75, 65),
(14, 3, 'CM1025', 'In computer science, what does the acronym "CPU" stand for?', '{"correct": "Central Processing Unit", "options": ["Central Processing Unit", "Computer Programming Unit", "Central Program Unit", "Central Peripheral Unit"]}', 2, 'http://example.com/video/14', 140, 14, 80, 70),
(15, 1, 'CM1025', 'Which data structure follows the Last In, First Out (LIFO) principle?', '{"correct": "Stack", "options": ["Queue", "Linked List", "Stack", "Tree"]}', 3, 'http://example.com/video/15', 150, 15, 85, 75),
(16, 1, 'CM1025', 'What is the purpose of a compiler in programming?', '{"correct": "To translate high-level programming code into machine code", "options": ["To execute code line by line", "To debug software", "To translate high-level programming code into machine code", "To manage database operations"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(17, 1, 'CM1025', 'Which programming paradigm emphasizes immutability and declarative coding?', '{"correct": "Functional Programming", "options": ["Object-Oriented Programming", "Procedural Programming", "Functional Programming", "Scripting"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(18, 1, 'CM1025', 'What is the purpose of the binary search algorithm?', '{"correct": "Efficiently find a specific element in a sorted list", "options": ["Sort a list of elements", "Efficiently find a specific element in a sorted list", "Perform arithmetic operations", "Create a random number"]}', 3, 'http://example.com/video/17', 170, 17, 95, 85),
(19, 4, 'CM2015', 'What is the primary purpose of the "if name == "main":" statement in a Python script?', '{"correct": "To check if the script is being run as the main program", "options": ["To define a function", "To import modules", "To declare variables", "To check if the script is being run as the main program"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(20, 1, 'CM2015', 'Which built-in data type is used to represent an ordered collection of items in Python?', '{"correct": "List", "options": ["Tuple", "Set", "List", "Dictionary"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(21, 2, 'CM2015', 'In Python, what is the purpose of the "zip" function?', '{"correct": "To combine multiple iterable objects into a single iterable of tuples", "options": ["To sort a list", "To reverse a string", "To concatenate strings", "To combine multiple iterable objects into a single iterable of tuples"]}', 3, 'http://example.com/video/16', 160, 16, 90, 80),
(22, 3, 'CM2015', 'What does the "with" statement in Python primarily help with when working with file handling?', '{"correct": "Automatic resource management (like file closing)", "options": ["Error handling", "Synchronization", "Automatic resource management (like file closing)", "Code optimization"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(23, 4, 'CM2015', 'Which library in Python is commonly used for data manipulation and analysis, providing data structures like DataFrames?', '{"correct": "Pandas", "options": ["NumPy", "Matplotlib", "Pandas", "SciPy"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(24, 5, 'CM1025', 'What is the purpose of the "map" function in Python?', '{"correct": "To apply a function to every item in an iterable and return an iterator", "options": ["To filter items in an iterable", "To reverse the order of items in an iterable", "To apply a function to every item in an iterable and return an iterator", "To concatenate two iterables"]}', 3, 'http://example.com/video/16', 160, 16, 90, 80),
(25, 1, 'CM2005', 'What is the primary goal of Object-Oriented Programming (OOP)?', '{"correct": "Model real-world entities and their interactions", "options": ["Optimize code execution speed", "Minimize memory usage", "Model real-world entities and their interactions", "Achieve platform independence"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(26, 2, 'CM2005', 'In OOP, what is an object?', '{"correct": "An instance of a class", "options": ["A programming function", "A reserved keyword", "An instance of a class", "A data type"]}' , 2, 'http://example.com/video/16', 160, 16, 90, 80),
(27, 3, 'CM2005', 'What does the term "method" refer to in OOP?', '{"correct": "A function defined within a class", "options": ["A variable in a class", "A reserved keyword for inheritance", "A function defined within a class", "A type of object"]}', 3, 'http://example.com/video/16', 160, 16, 90, 80),
(28, 4, 'CM2005', 'Explain the concept of "inheritance" in OOP.', '{"correct": "It allows a class to inherit attributes and methods from another class", "options": ["It involves creating multiple instances of a class", "It is a way of encapsulating data", "It allows a class to inherit attributes and methods from another class", "It refers to the process of creating a new class"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(29, 5, 'CM2005', 'What is the benefit of using encapsulation in OOP?', '{"correct": "It helps bundle data and methods together, enhancing data security and modularity", "options": ["It improves code execution speed", "It allows for easy creation of objects", "It helps bundle data and methods together, enhancing data security and modularity", "It simplifies the process of object instantiation"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(30, 1, 'CM2005', 'What is the purpose of the "super()" function in Python classes?', '{"correct": "It is used to call the constructor of the parent class", "options": ["It is a built-in method for data manipulation", "It is used to access the attributes of the current instance", "It is used to call the constructor of the parent class", "It is a reserved keyword for polymorphism"]}', 3, 'http://example.com/video/16', 160, 16, 90, 80),
(31, 1, 'CM2040', 'What is a primary key in a relational database?', '{"correct": "A unique identifier for each record in a table", "options": ["The first record in a table", "A foreign key in a table", "A unique identifier for each record in a table", "The total number of records in a table"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(32, 3, 'CM2040', 'What is the purpose of an IP address in networking?', '{"correct": "To uniquely identify a device on a network", "options": ["To store data in a database", "To define the structure of a webpage", "To uniquely identify a device on a network", "To determine the color of a pixel in an image"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(33, 2, 'CM2040', 'What is HTTP in the context of the World Wide Web?', '{"correct": "Hypertext Transfer Protocol", "options": ["Hyperlink and Text Transfer Protocol", "High-Tech Transfer Protocol", "Hypertext Transfer Protocol", "Hierarchical Text Transformation Process"]}', 3, 'http://example.com/video/16', 160, 16, 90, 80),
(34, 2, 'CM2040', 'What is the purpose of SQL in databases?', '{"correct": "Structured Query Language; used to manage and manipulate relational databases", "options": ["Simple Question Language; used for asking questions in databases", "Structured Query Logic; used for logical operations in programming", "Structured Question Language; used for querying structured data", "Structured Query Language; used to manage and manipulate relational databases"]}', 1, 'http://example.com/video/16', 160, 16, 90, 80),
(35, 5, 'CM2040', 'What is the function of a router in a computer network?', '{"correct": "To forward data packets between different computer networks", "options": ["To store data temporarily", "To connect peripheral devices to a computer", "To manage the system clock of a network", "To forward data packets between different computer networks"]}', 2, 'http://example.com/video/16', 160, 16, 90, 80),
(36, 1, 'CM2040', 'What is a URL?', '{"correct": "Uniform Resource Locator; an address used to access resources on the web", "options": ["Universal Resource Link; a link between different web pages", "Uniform Resource Locator; an address used to access resources on the web", "Unified Resource Listing; a list of resources in a database", "Universal Resource Locator; a unique identifier for a device on a network"]}', 3, 'http://example.com/video/16', 160, 16, 90, 80);

INSERT INTO quiz (quiz_id, module_id, questionsPool) VALUES
(1, 'CM1020', '["1","2","3","4","5","6"]'),
(2, 'CM1005', '["7","8","9","10","11","12"]'),
(3, 'CM1025', '["13","14","15","16","17","18"]');

INSERT INTO mockArticles (articles_id, content) VALUES
(1, '{"title":"Sample Article", "body":"This is a sample article for demonstration."}');

COMMIT;