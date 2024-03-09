// CourseInformation.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CourseInformation = () => {
  // Retrieve module_name from URL parameters
  const { module_name } = useParams();

  return (
    <div>
      <h2>Course Information</h2>
      <p>Module Name: {module_name}</p>
      {/* Add more details or fetch additional information from the server as needed */}
    </div>
  );
};

export default CourseInformation;