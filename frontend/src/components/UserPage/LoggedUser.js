// LoggedUser.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';

const LoggedUser = ({ viewingUserId }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    userId: '', // Assuming the user data includes a userId field
  });

  useEffect(() => {
    // Fetch user data from your API and set it in state
    // Placeholder for fetch logic
    // Make sure to set the userId as part of the user state
  }, []);

  const isOwnProfile = user.userId === viewingUserId;

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {isOwnProfile ? "My Profile" : `${user.username}'s Profile`}
      </Typography>
      {isOwnProfile ? (
        // Render components for the logged-in user's own profile
        <div>
          {/* User's own profile components */}
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </div>
      ) : (
        // Render components for viewing another user's profile
        <div>
          {/* Components for viewing another user's profile */}
          <Typography>
            Email: {user.email}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default LoggedUser;
