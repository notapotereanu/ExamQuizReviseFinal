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

  return (
    <div style={{ textAlign: 'center', marginTop: '90px' }}>
      <h2>{moduleDetails.module_name}</h2>
      <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <p>{moduleDetails.module_description}</p>
      </div>
      {/* Add more details or fetch additional information from the server as needed */}
    </div>
  );
};
export default CourseInformation;