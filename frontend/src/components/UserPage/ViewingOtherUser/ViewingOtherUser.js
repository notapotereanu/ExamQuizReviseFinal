import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import UserDisplayForm from './UserDisplayForm';
import QuestionsList from '../QuestionsList';

const ViewingOtherUser = ({ userData , userId}) => {

  return (
    <div style={{ marginTop: '80px', marginBottom: '80px' }}>
      <Container component="main">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography component="h1" variant="h5">User Profile</Typography>
            <UserDisplayForm userData={userData} />
          </Grid>
          <Grid item xs={12} md={8}>
            <QuestionsList userData={userData} userId={userId}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ViewingOtherUser;
