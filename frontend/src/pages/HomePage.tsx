import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/') // Replace with your Flask API URL
      .then(response => response.text())
      .then(data => {
        setMessage(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setMessage('Error fetching data');
      });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default HomePage;
