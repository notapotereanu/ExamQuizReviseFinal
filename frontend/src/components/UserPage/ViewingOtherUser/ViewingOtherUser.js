import { Container, Grid, Typography } from '@mui/material';
import UserDisplayForm from './UserDisplayForm'; // Import the profile form component
import React, { useState } from 'react';

const ViewingOtherUser = ({ userData }) => {
  // Your existing state and handlers
  
  return (
    <div style={{ marginTop: '80px' }}>
      <Container component="main">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography component="h1" variant="h5">Edit Profile</Typography>
            <UserDisplayForm userData={userData} />
            {/* Optionally add the UserDisplayForm here or elsewhere depending on desired layout */}
            <UserDisplayForm userData={userData} />
          </Grid>
          <Grid item xs={12} md={8}>
            {/* Additional content can go here */}
          </Grid>
        </Grid>
      </Container>
      {/* Your Dialog component remains unchanged */}
    </div>
  );
};

export default ViewingOtherUser;
