import React from 'react';
import { Typography, Button } from '@mui/material';

const ModuleDetails = ({ module_id, module_difficulty, handlePrev, handleNext }) => (
  <>
    <Typography component="h1" variant="h5" sx={{ fontSize: '1.5rem' }}>
      Module Details
    </Typography>
    <Typography>Module ID: {module_id}</Typography>
    <Typography>Module Difficulty: {module_difficulty}</Typography>
    <Button onClick={handlePrev}>Previous</Button>
    <Button onClick={handleNext}>Next</Button>
  </>
);

export default ModuleDetails;
