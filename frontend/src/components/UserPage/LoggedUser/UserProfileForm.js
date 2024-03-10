import React from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useUserData } from './useUserData'; // Import the custom hook

const UserProfileForm = ({ userData }) => {
  const {
    email,
    password,
    confirmPassword,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  } = useUserData(userData);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        value={userData.username}
        InputProps={{ readOnly: true }}
        variant="filled"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="password"
        label="New Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Update Profile
      </Button>
    </form>
  );
};

export default UserProfileForm;
