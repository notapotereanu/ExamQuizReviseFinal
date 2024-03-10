// CourseInformation.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseInformation = () => {
  // Retrieve module_id from URL parameters
  const { module_id } = useParams();
  const [moduleDetails, setModuleDetails] = useState({});

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/modules/${module_id}`);
        const data = await response.json();
        setModuleDetails(data);
      } catch (error) {
        console.error('Could not fetch module details:', error);
      }
    };

    fetchModuleDetails();
  }, [module_id]);

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: '30px',
    padding: '20px',
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '20px',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '90px' }}>
      <h2>{moduleDetails.module_name}</h2>
      <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <p>{moduleDetails.module_description}</p>
        {moduleDetails.linkToSyllabus && (
          <p>
            <strong>Syllabus Link:</strong>{' '}
            <a href={moduleDetails.linkToSyllabus} target="_blank" rel="noopener noreferrer">
              View Syllabus
            </a>
          </p>
        )}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Choose Quiz</h2>
          <div style={{ marginBottom: '40px', width: '100%' }}>
            <button style={buttonStyle}>Basic</button>
            <button style={buttonStyle}>Intermediate</button>
            <button style={buttonStyle}>Advanced</button>
          </div>
          <button style={{ ...buttonStyle, backgroundColor: 'green' }}>
            Create Your Quiz Question
          </button>
        </div>
      </div>
      {/* Add more details or fetch additional information from the server as needed */}
    </div>
  );
};

export default CourseInformation;