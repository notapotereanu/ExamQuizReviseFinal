import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const FeedbackDialog = ({ open, onClose, content }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Feedback</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default FeedbackDialog;
