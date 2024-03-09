import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ViewingOtherUser = ({ user }) => {
  console.log(user)
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {user.username}'s Profile
      </Typography>
      <div>
        <Typography>Email: {user.email}</Typography>
        {/* Add other user details you want to display here */}
        
        {/* Optionally, include actions like 'Follow', 'Send Message', etc., depending on your application's functionality */}
        <Button variant="contained" color="primary">
          Follow
        </Button>
        {/* More actions as needed */}
      </div>
    </Container>
  );
};

export default ViewingOtherUser;
