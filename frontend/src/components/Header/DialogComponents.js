import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@material-ui/core';

export const LoginDialog = ({ open, handleClose, formData, handleChange, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const CreateAccountDialog = ({ open, handleClose, formData, handleChange, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const FeedbackDialog = ({ open, handleClose, message, status }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Feedback"}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: status === 'error' ? 'red' : 'green' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
