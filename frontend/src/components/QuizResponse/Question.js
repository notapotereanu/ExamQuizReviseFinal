import React from 'react';
import { Typography, Button } from '@mui/material';

const Question = ({ question, answers, selectedOption, handleOptionSelect, handleSubmit }) => (
  <>
    <Typography component="h2" variant="h6" sx={{ fontSize: '1.4rem' }}>
      Question:
    </Typography>
    <Typography sx={{ fontSize: '1.2rem' }}>{question}</Typography>
    <div style={{ width: '100%' }}>
      {answers.options.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === option ? "contained" : "outlined"}
          style={{
            width: '100%',
            justifyContent: 'center',
            margin: '8px 0',
            textTransform: 'none',
          }}
          onClick={() => handleOptionSelect(option)}
          fullWidth
        >
          {option}
        </Button>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '60px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ width: '50%' }}
      >
        Submit
      </Button>
    </div>
  </>
);

export default Question;
