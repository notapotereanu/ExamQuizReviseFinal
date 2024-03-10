import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

export const useUserData = (initialUserData) => {
  const [email, setEmail] = useState(initialUserData.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return; 
    }
  
    try {
      const userId = localStorage.getItem('user_id');
      const payload = {
        email: email,
        password: password,
        user_id: userId
      };
      
      const response = await axios.post(`http://127.0.0.1:5000/api/update_user`, payload);
      setEmail(''); 
      setPassword('');
      setConfirmPassword('');
      
      console.log(response.data);
      alert("Profile updated successfully.");
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Failed to update profile.");
    }
  };

  return {
    email,
    password,
    confirmPassword,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};
