import axios from 'axios';
import { getToken } from './auth'; // Import the getToken function from auth.js

const API_URL = 'http://localhost:5000/api'; // Base URL for the API

// Create an axios instance with default headers
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` // Set the Authorization header with the token
    },
    timeout: 10000, // Set a timeout for requests
    validateStatus: function (status) {
        return status >= 200 && status < 500; // Accept only 2xx and 4xx responses
    }
});

// Function to set the Authorization header with the token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the header
    } else {
        delete api.defaults.headers.common['Authorization']; // Remove the token from the header
    }
};


// Function to get the current user
export const getCurrentUser = async () => {
    try {
        const response = await api.get('/user'); // Make a GET request to the /user endpoint
        return response.data; // Return the user data from the response
    } catch (error) {
        console.error('Error fetching current user:', error); // Log any errors
        throw error; // Rethrow the error for further handling
    }
};