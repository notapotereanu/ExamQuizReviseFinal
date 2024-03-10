import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openCreateAccountDialog, setOpenCreateAccountDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [createAccountFormData, setCreateAccountFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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
      const response = await axios.post('http://127.0.0.1:5000/api/login', loginFormData);
      // Assuming the response includes the user_id
      const { access_token, user_id } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_id', user_id);
      setUserId(user_id); 
      setIsLoggedIn(true);
      setOpenLoginDialog(false);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setFeedbackMessage('Login failed. Please try again.');
      setFeedbackStatus('error');
      setOpenFeedbackDialog(true);
    }
  };

  const handleSubmitCreateAccount = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/api/register', createAccountFormData);
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
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    navigate('/');
  };

  return {
    userId,
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
