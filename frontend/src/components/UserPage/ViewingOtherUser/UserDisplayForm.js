import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';

const UserDisplayForm = ({ userData }) => {
  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Username:</Typography>
          <Typography>{userData.username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Email:</Typography>
          <Typography>{userData.email}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserDisplayForm;
