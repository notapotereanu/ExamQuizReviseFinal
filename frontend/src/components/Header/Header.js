import React from 'react';
import { AppBar, Toolbar,  Button,TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button edge="start" color="inherit" aria-label="logo" >
          <img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
        </Button>
        <Button color="inherit">Create Question</Button>
        <Button color="inherit">Random Course</Button>
        <Button color="inherit">List Courses</Button>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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