import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import ModuleDetails from './ModuleDetails';
import Question from './Question';
import FeedbackDialog from './FeedbackDialog';
import { Typography, Button } from '@mui/material';

const ModuleResponse = () => {
  const { module_id, module_difficulty, question_id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  
  useEffect(() => {
    console.log(module_id, module_difficulty, question_id)
    fetch(`http://localhost:5000/questions/${module_id}/${module_difficulty}`)
      .then(response => response.json())
      .then(data => {
        const parsedQuestions = data.map(question => ({
          ...question,
          answers: JSON.parse(question.answers) 
        }));
        
        setQuestions(parsedQuestions);

        if (question_id) {
          const questionIndex = parsedQuestions.findIndex(question => question.question_id.toString() === question_id);
          if (questionIndex !== -1) {
            setCurrentIndex(questionIndex);
          }
        } else {
          setCurrentIndex(0); 
        }
        
        setSelectedOption(''); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [module_id, module_difficulty, question_id]);
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const correctAnswer = questions[currentIndex].answers.correct;
    if (selectedOption === correctAnswer) {
      setDialogContent('Correct answer!');
    } else {
      setDialogContent('Wrong answer. Try again!');
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % questions.length); // Move to next question, loop back to the first at the end
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + questions.length) % questions.length); // Move to previous question, loop back to the last if at the first
  };

  return (
    <Container component="main" maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ marginBottom: '40px' }}>
          <ModuleDetails module_id={module_id} module_difficulty={module_difficulty} handlePrev={handlePrev} handleNext={handleNext} />
        </Grid>
        <Grid item xs={12} md={8}>
          {questions.length > 0 && currentIndex < questions.length ? (
            <Question
              question={questions[currentIndex].question}
              answers={questions[currentIndex].answers}
              selectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Typography sx={{ fontSize: '1.2rem' }}>No questions available.</Typography>
          )}
        </Grid>
      </Grid>
      <FeedbackDialog open={openDialog} onClose={handleDialogClose} content={dialogContent} />
    </Container>
  );
};

export default ModuleResponse;
