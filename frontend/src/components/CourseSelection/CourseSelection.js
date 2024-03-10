
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Box, Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
    backgroundColor: '#FFFFE0',
    padding: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
}));

const CourseSelection = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/modules');
        const data = await response.json();
        console.log(data);
        setModules(data.modules);
      } catch (error) {
        console.error('Could not fetch modules:', error);
      }
    };

    fetchModules();
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '80px' }}>
      <Container>
        {modules && modules.length > 0 ? (
          modules.map((module) => (
            <Paper key={module.module_id} className={classes.sectionContainer} elevation={3}>
              <h2>{`Level ${module.module_level}: ${module.module_name}`}</h2>
              <Box className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/courseInformation/${module.module_id}`)}
                  >
                    {`${module.module_name} Details`}
                </Button>
              </Box>
            </Paper>
          ))
        ) : (
          <p>No modules available.</p>
        )}
      </Container>
    </div>
  );
};

export default CourseSelection;