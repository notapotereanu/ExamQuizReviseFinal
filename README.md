# ExamQuizReviseFinal - Installation
First of all you shoul install some additional packages to start to work with our python backend and our react frontend. You shuld install python3 and node in your local computer, don't forget to add them in the system enviorement PATH, so you can launch the comands node and python from the terminal directly. 

We have to install some additional packages:

cd frontend
npm install --save @types/react @types/react-dom 
cd ..

# ExamQuizReviseFinal - Running
Enter in the termial in the project path and launch:

cd backend
npm run build-db-win

It should create the database.db file.
Then we can go forward and, if you have Windows you can launch the powershell terminal and launch those comands:

pip install -r requirements.txt
python app.py


Open a new terminal in the project folder and launch
cd frontend
npm start