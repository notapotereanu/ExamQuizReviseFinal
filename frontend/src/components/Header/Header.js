import { AppBar, Toolbar, Button, TextField, List, ListItem, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], quizzes: [] });

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery) { // Only make the request if searchQuery is not empty
        axios.get('http://localhost:5000/search', {
          params: {
            query: searchQuery
          }
        })
          .then((response) => {
            console.log(searchQuery)
            console.log(response.data);
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error('Error fetching search results:', error);
          });
      } else {
        setSearchResults({ users: [], quizzes: [] }); // Clear the search results when the search query is empty
      }
    }, 100); // delay in milliseconds

    // Cleanup function to clear the timeout if the component is unmounted or if the search query changes
    return () => clearTimeout(timerId);
  }, [searchQuery]); // dependency array

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleQuizClick = (id) => {
    navigate(`/module/${id}`);
  };

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <AppBar>
      <Toolbar style={{ fontFamily: 'Roboto, sans-serif' }}>
        <Button edge="start" color="inherit" aria-label="logo" style={{ marginRight: '20px' }} onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" style={{ height: '30px' }} />
        </Button>
        <Button color="inherit">Create Question</Button>
        <Button color="inherit">Random Course</Button>
        <Button color="inherit">List Courses</Button>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '20px' }}>
          <SearchIcon />
          <Autocomplete
            options={searchResults.quizzes.concat(searchResults.users)}
            getOptionLabel={(option) => option.title || option.username}
            groupBy={(option) => option.title ? 'Modules' : 'Users'}
            style={{ width: 300 }}
            onInputChange={handleSearchChange}
            renderOption={(option) => (
              <div>
                {option.title ? option.title : option.username}
              </div>
            )}
            renderInput={(params) =>
              <TextField
                {...params}
                label={isFocused ? null : "Search Modules and Users..."}
                variant="outlined"
                InputProps={{ ...params.InputProps, style: { backgroundColor: 'white' } }}
                InputLabelProps={{ shrink: false }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            }
            onChange={(event, value) => {
              if (value) {
                if (value.title) { // If the selected option has a title, it's a quiz
                  handleQuizClick(value.module_id);
                } else if (value.username) { // If the selected option has a username, it's a user
                  handleUserClick(value.user_id);
                }
              }
            }}
          />
        </div>
        <Button color="inherit">Create Account</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;