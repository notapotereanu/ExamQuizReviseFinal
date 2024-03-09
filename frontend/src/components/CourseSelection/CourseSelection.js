import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(2),
  },
  sectionContainer: {
    backgroundColor: '#E6F7FF', // Light blue background color
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const CourseSelection = () => {
  // Use the useStyles hook to get the styles
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Use the navigate function to navigate to a different route
    navigate('/another-route');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Your App Name
          </Typography>
          <Button color="inherit" onClick={handleButtonClick}>
            Another Route
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box className={classes.sectionContainer}>
          <h2>Level 4 Subjects</h2>
          {/* Your Level 4 Subjects */}
          <Box className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              aa
            </Button>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              bb
            </Button>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              cc
            </Button>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              dd
            </Button>
          </Box>
        </Box>
      </Container>

      <Container>
        <Box className={classes.sectionContainer}>
          <h2>Level 5 Subjects</h2>
          {/* Your Level 5 Subjects */}
          <Box className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              aa
            </Button>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              bb
            </Button>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              cc
            </Button>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              dd
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};



export default CourseSelection;