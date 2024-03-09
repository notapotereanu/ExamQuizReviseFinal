import React from 'react';
import { AppBar, Toolbar, Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useSearch } from './useSearch';
import { LoginDialog, CreateAccountDialog, FeedbackDialog } from './DialogComponents';

const Header = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    handleLogout,
    handleOpenCreateAccountForm,
    handleLoginOpen,
    openLoginDialog,
    handleLoginClose,
    loginFormData,
    handleLoginChange,
    handleLoginSubmit,
    openCreateAccountDialog,
    handleCloseCreateAccountDialog,
    createAccountFormData,
    handleChangeCreateAccountForm,
    handleSubmitCreateAccount,
    openFeedbackDialog,
    feedbackMessage,
    feedbackStatus,
    setOpenFeedbackDialog
  } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    handleSearchChange,
    handleQuizClick,
    handleUserClick,
    isFocused,
    setIsFocused
  } = useSearch();

  return (
    <AppBar>
      <Toolbar style={{ fontFamily: 'Roboto, sans-serif' }}>
        <Button edge="start" color="inherit" aria-label="logo" style={{ marginRight: '20px' }} onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" style={{ height: '30px' }} />
        </Button>
        <Button color="inherit" onClick={() => navigate('/create-question')}>
        Create Question
        </Button>
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
            renderOption={(option) => <div>{option.title || option.username}</div>}
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
        {!isLoggedIn ? (
          <>
            <Button color="inherit" onClick={handleOpenCreateAccountForm}>Create Account</Button>
            <Button color="inherit" onClick={handleLoginOpen}>Log in</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Log Out</Button>
        )}
      </Toolbar>
      <LoginDialog
        open={openLoginDialog}
        handleClose={handleLoginClose}
        formData={loginFormData}
        handleChange={handleLoginChange}
        handleSubmit={handleLoginSubmit}
      />
      <CreateAccountDialog
        open={openCreateAccountDialog}
        handleClose={handleCloseCreateAccountDialog}
        formData={createAccountFormData}
        handleChange={handleChangeCreateAccountForm}
        handleSubmit={handleSubmitCreateAccount}
      />
      <FeedbackDialog
        open={openFeedbackDialog}
        handleClose={() => setOpenFeedbackDialog(false)}
        message={feedbackMessage}
        status={feedbackStatus}
      />
    </AppBar>
  );
};

export default Header;
