import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    cursor: 'pointer',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" className={classes.logo}>
          <Typography variant="h6">
            Logo
          </Typography>
        </IconButton>
        <div className={classes.grow} />
        <Typography variant="body1">
          Name 1 | Name 2 | Name 3 | Name 4 | Name 5
        </Typography>
        <div className={classes.grow} />
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;