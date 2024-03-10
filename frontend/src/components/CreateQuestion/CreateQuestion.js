import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuestion = () => {
  const accessToken = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({ module_id: '', module_name: '' });

  const [questionData, setQuestionData] = useState({
    module_id: '',
    question: '',
    author_id: userId,
    answers: ['', '', '', ''],
    correctAnswer: '',
    difficulty: '',
  });

  // Successful submition response
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/modules');
        const data = await response.json();
        setModules(data.modules);
      } catch (error) {
        console.error("Could not fetch modules:", error);
      }
    };

    fetchModules();
  }, []);

  const handleModuleChange = (event) => {
    const moduleId = event.target.value;
    const selectedModule = modules.find(mod => mod.module_id === moduleId);
    
    if (selectedModule) {
      setQuestionData(prevData => ({ ...prevData, module_id: moduleId }));
      setSelectedModule({ module_id: moduleId, module_name: selectedModule.module_name });
    }
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...questionData.answers];
    newAnswers[index] = event.target.value;
    setQuestionData(prevData => ({ ...prevData, answers: newAnswers }));
  };

  const handleDifficultyChange = (event) => {
    setQuestionData(prevData => ({ ...prevData, difficulty: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/add-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...questionData,
          answers: JSON.stringify(questionData.answers) // Serialize answers array to JSON string
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setQuestionData({ // Reset the form after successful submission
          module_id: '',
          question: '',
          author_id: userId,
          answers: ['', '', '', ''],
          correctAnswer: '',
          difficulty: '',
        });
        setIsSubmitted(true); // Show success message
        // Set a timeout to hide the message after 5 seconds (5000 milliseconds)
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);

      } else {
        console.error('Failed to add question');
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };
  
  if (!accessToken || !userId) {
    return (
      <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">User not logged In. Maybe create an account or log in to continue.</Typography>
      </Container>
    );
  }

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
                {module.module_id} - {module.module_name}
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
      {isSubmitted && (
      <div className="success-message">
        Thank you for your contribution. Your question has been successfully uploaded!
      </div>
    )}
    </Container>
  );
};

export default CreateQuestion;
