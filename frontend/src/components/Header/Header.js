import React from 'react';
import { AppBar, Toolbar,  Button,TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar>
      <Toolbar>
        <Button edge="start" color="inherit" aria-label="logo" style={{ marginRight: '20px' }} onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" style={{ height: '30px' }} />
        </Button>
        <Button color="inherit">Create Question</Button>
        <Button color="inherit">Random Course</Button>
        <Button color="inherit">List Courses</Button>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '20px' }}>
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