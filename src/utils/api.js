import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

console.log("BASE URL:", baseURL); // 👈 add this line for debug

const api = axios.create({
  baseURL,
});

export default api;