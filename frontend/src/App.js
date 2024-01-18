import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // State to store users data

  useEffect(() => {
    // Fetch users from the backend
    fetch('http://localhost:5000/users') // Replace with your Flask API URL
      .then(response => response.json())
      .then(data => {
        setUsers(data); // Set users data in state
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Users List</h1>
        <ul>
          {users.map(user => (
            <li key={user.user_id}>{user.username}</li> // Adjust according to your user object structure
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
