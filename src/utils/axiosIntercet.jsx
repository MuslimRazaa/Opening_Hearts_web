import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://openheartsbackend.testingwebsitelink.com/api/', // Change this to your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get latest token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;