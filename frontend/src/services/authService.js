import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register a new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login a user
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Save token to localStorage
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
};

// Get current user token
const getToken = () => {
  return localStorage.getItem('token');
};

// Verify if the user is logged in (Optional)
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const authService = {
  register,
  login,
  logout,
  getToken,
  isAuthenticated,
};
