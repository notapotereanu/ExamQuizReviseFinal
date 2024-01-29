import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Typography variant="h6">
            Logo
          </Typography>
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Placeholder
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon />
          <TextField placeholder="Search..." />
        </div>
        <Button color="inherit">Create Account</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;