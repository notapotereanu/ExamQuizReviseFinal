import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({ 
  appBar: { top: 'auto', bottom: 0, }, 
  grow: { flexGrow: 1, }, 
  logo: { cursor: 'pointer', }, }));


const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Button edge="start" color="inherit" aria-label="logo" className={classes.logo} onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" style={{ height: '20px' }} /> {/* Adjust the height as needed */}
          </Button>
        </div>
        <div>
          <Typography variant="body1">
            Team Members:  Klara Lenyu, Abdulhameed Al-Ibadi, Yu Lin, Rishab Lakhotia, Andrian Potereanu
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            © {new Date().getFullYear()} ExamQuizRevise. All rights reserved.
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;