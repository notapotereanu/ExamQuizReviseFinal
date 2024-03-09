import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';



const CreateQuestion = () => {
  // Define initial state for the form, including a module_id
  const [questionData, setQuestionData] = useState({
    module_id: '',
    question: '',
    answers: ['', '', '', ''], // Assuming 4 possible answers for the multiple choice question
    correctAnswer: '',
    difficulty: '',
  });

  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({ module_id: '', module_name: '' });
 
  useEffect(() => {
  // Function to fetch modules
  const fetchModules = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/modules'); // Ensure the URL matches your backend's
      const data = await response.json();
      console.log(data)
      setModules(data.modules);
    } catch (error) {
      console.error("Could not fetch modules:", error);
    }
  };

  fetchModules();
}, []); // The empty array ensures this effect runs only once after the component mounts
  // Handler for module change
  const handleModuleChange = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    const moduleId = event.target.value;
    const moduleName = event.target.options[selectedIndex].getAttribute('data-name');
  
    setQuestionData({ ...questionData, module_id: moduleId });
    setSelectedModule({ module_id: moduleId, module_name: moduleName });
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
            {modules.map((module) => (
            <MenuItem key={module.module_id} value={module.module_id} data-name={module.module_name}>
                {module.module_id} {module.module_name}
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
