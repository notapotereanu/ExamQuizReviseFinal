import { Container, Grid, Typography } from '@mui/material';
import UserProfileForm from './UserProfileForm'; // Import the profile form component
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const LoggedUser = ({ userData }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  return (
    <div style={{ marginTop: '80px' }}>
      <Container component="main">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <UserProfileForm userData={userData} />
          </Grid>
          <Grid item xs={12} md={8}>
            {/* Additional content can go here */}
          </Grid>
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoggedUser;
