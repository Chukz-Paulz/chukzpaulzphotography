import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use environment variable for API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;