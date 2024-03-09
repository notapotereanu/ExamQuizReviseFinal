import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openCreateAccountDialog, setOpenCreateAccountDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [createAccountFormData, setCreateAccountFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleOpenCreateAccountForm = () => setOpenCreateAccountDialog(true);
  const handleCloseCreateAccountDialog = () => setOpenCreateAccountDialog(false);

  const handleLoginOpen = () => setOpenLoginDialog(true);
  const handleLoginClose = () => setOpenLoginDialog(false);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeCreateAccountForm = (event) => {
    const { name, value } = event.target;
    setCreateAccountFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginFormData);
      localStorage.setItem('access_token', response.data.access_token);
      setIsLoggedIn(true);
      setOpenLoginDialog(false);
    } catch (error) {
      console.error('Login failed:', error);
      setFeedbackMessage('Login failed. Please try again.');
      setFeedbackStatus('error');
      setOpenFeedbackDialog(true);
    }
  };

  const handleSubmitCreateAccount = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', createAccountFormData);
      setFeedbackMessage('Account creation successful!');
      setFeedbackStatus('success');
      setOpenCreateAccountDialog(false);
      setOpenFeedbackDialog(true);
    } catch (error) {
      console.error('Account creation failed:', error);
      setFeedbackMessage('Account creation failed. Please try again.');
      setFeedbackStatus('error');
      setOpenFeedbackDialog(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    openLoginDialog,
    handleLoginOpen,
    handleLoginClose,
    loginFormData,
    handleLoginChange,
    handleLoginSubmit,
    openCreateAccountDialog,
    handleOpenCreateAccountForm,
    handleCloseCreateAccountDialog,
    createAccountFormData,
    handleChangeCreateAccountForm,
    handleSubmitCreateAccount,
    openFeedbackDialog,
    feedbackMessage,
    feedbackStatus,
    setOpenFeedbackDialog,
    handleLogout,
  };
};
