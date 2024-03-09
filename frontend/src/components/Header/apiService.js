import axios from 'axios';

// Define the base URL for all API requests
const API_BASE_URL = 'http://localhost:5000/api';

// Configure axios if needed (e.g., headers)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // Add headers or other configurations as needed
  // headers: { 'Content-Type': 'application/json' },
});

// Handle login API call
export const loginUser = async (loginData) => {
  try {
    const response = await apiClient.post('/login', loginData);
    return response.data;
  } catch (error) {
    // Optionally, handle errors or rethrow them
    throw error;
  }
};

// Handle registration API call
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    // Optionally, handle errors or rethrow them
    throw error;
  }
};

// Handle search API call
export const searchQuery = async (query) => {
  try {
    const response = await apiClient.get('/search', { params: { query } });
    return response.data;
  } catch (error) {
    // Optionally, handle errors or rethrow them
    throw error;
  }
};