import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuestionsList = ({ userId }) => {
  const [questionCategories, setQuestionCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get_questions_details/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestionCategories(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchQuestions();
  }, [userId]);

  const handleQuestionClick = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <div>
      {questionCategories.map((category, index) => (
        <div key={index}>
          <Typography variant="h6" style={{marginTop: '20px'}}>{category.title}</Typography>
          {category.data.length > 0 ? (
            category.data.map((question) => (
              <Card key={question.question_id} style={{marginBottom: '10px'}}>
                <CardActionArea onClick={() => handleQuestionClick(question.question_id)}>
                  <CardContent>
                    <Typography>{question.question}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          ) : (
            <Typography>Nothing to see here, move on...</Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
