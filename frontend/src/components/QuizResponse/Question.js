import React from 'react';
import { Typography, Button, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Question = ({
  question,
  answers,
  totalAttempts,
  totalSolvedTimes,
  totalLikes,
  totalDislikes,
  selectedOption,
  handleOptionSelect,
  handleSubmit,
  handleLike,
  handleDislike
}) => (
  <>
    <Typography component="h2" variant="h6" sx={{ fontSize: '1.4rem', marginBottom: '20px' }}>
      Question:
    </Typography>
    <Typography sx={{ fontSize: '1.2rem', marginBottom: '20px' }}>{question}</Typography>
    <div style={{ width: '100%', marginBottom: '20px' }}>
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
        >
          {option}
        </Button>
      ))}
    </div>
    <Typography sx={{ textAlign: 'center', marginBottom: '20px' }}>
      Total Attempts: {totalAttempts} | Times Solved: {totalSolvedTimes}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '20px' }}>
      <IconButton onClick={handleLike} aria-label="like">
        <ThumbUpIcon />
        <Typography sx={{ marginLeft: '8px' }}>{totalLikes}</Typography>
      </IconButton>
      <IconButton onClick={handleDislike} aria-label="dislike">
        <ThumbDownIcon />
        <Typography sx={{ marginLeft: '8px' }}>{totalDislikes}</Typography>
      </IconButton>
    </Box>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
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
