import React, { useState, useEffect } from 'react';
import './ModulePage.css';

const ModulePage = ({ moduleId }) => {
  const [moduleInfo, setModuleInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Fetch module details
  useEffect(() => {
    fetch(`/api/module/${moduleId}`)
      .then(response => response.json())
      .then(data => setModuleInfo(data))
      .catch(error => console.error('Error fetching module info:', error));
  }, [moduleId]);

  // Fetch questions of selected difficulty
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    fetch(`/api/questions/${moduleId}?difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => setQuestions(data.questions))
      .catch(error => console.error('Error fetching questions:', error));
  };
  
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>{moduleInfo.module_name}</h1>
        <p>{moduleInfo.module_description}</p>
        {moduleInfo.linkToSyllabus && (
          <a href={moduleInfo.linkToSyllabus} target="_blank" rel="noopener noreferrer">View Syllabus</a>
        )}
      </div>
      <div className="difficulty-buttons">
        <button onClick={() => handleDifficultyChange('basic')}>Basic</button>
        <button onClick={() => handleDifficultyChange('intermediate')}>Intermediate</button>
        <button onClick={() => handleDifficultyChange('advanced')}>Advanced</button>
      </div>
      <div className="questions-list">
        {questions.length > 0 && selectedDifficulty && (
          <>
            <h2>Questions - Difficulty: {['Basic', 'Intermediate', 'Advanced'][selectedDifficulty - 1]}</h2>
            <ul>
              {questions.map(question => (
                <li key={question.question_id}>{question.question}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
