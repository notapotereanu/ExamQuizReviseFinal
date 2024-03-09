import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const CreateQuestion = () => {
  // Define initial state for the form, including a module_id
  const [questionData, setQuestionData] = useState({
    module_id: '',
    question: '',
    answers: ['', '', '', ''], // Assuming 4 possible answers for the multiple choice question
    correctAnswer: '',
    difficulty: '',
  });

  // Handlers for form inputs would be here...
  
  // Define the mock modules directly within the component
  const mockModules = [
    { module_id: 1, title: 'Mathematics' },
    { module_id: 2, title: 'World History' },
  ];
  
  // Handler for module change
  const handleModuleChange = (event) => {
    setQuestionData({ ...questionData, module_id: event.target.value });
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...questionData.answers];
    newAnswers[index] = event.target.value;
    setQuestionData({ ...questionData, answers: newAnswers });
  };

  const handleDifficultyChange = (event) => {
    setQuestionData({ ...questionData, difficulty: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the answers JSON string
    const answersJSON = {
      options: questionData.answers,
      correct: questionData.correctAnswer,
    };

    // Add your submit logic here
    console.log('Form Data:', questionData);
    console.log('Answers JSON:', JSON.stringify(answersJSON));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>
        Create a New Question
      </Typography>
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
          <InputLabel id="module-label">Module</InputLabel>
          <Select
            labelId="module-label"
            name="module_id"
            value={questionData.module_id}
            onChange={handleModuleChange}
          >
            {mockModules.map((module) => (
              <MenuItem key={module.module_id} value={module.module_id}>
                {module.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          margin="normal"
          value={questionData.question}
          onChange={e => setQuestionData({ ...questionData, question: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label"
            name="difficulty"
            value={questionData.difficulty}
            onChange={handleDifficultyChange}
          >
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        {/* Multiple choice answers input fields */}
        <Typography variant="h6" style={{ margin: '20px 0 10px' }}>
          Answers
        </Typography>
        {questionData.answers.map((answer, index) => (
          <TextField
            key={index}
            label={`Answer ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={answer}
            onChange={e => handleAnswerChange(index, e)}
          />
        ))}
        <FormControl fullWidth margin="normal">
          <InputLabel id="correct-answer-label">Correct Answer</InputLabel>
          <Select
            labelId="correct-answer-label"
            name="correctAnswer"
            value={questionData.correctAnswer}
            onChange={e => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
          >
            {questionData.answers.map((answer, index) => (
              <MenuItem key={index} value={answer}>
                {answer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" style={{ margin: '20px 0' }}>
          Submit Question
        </Button>
      </form>
    </Container>
  );
};

export default CreateQuestion;
