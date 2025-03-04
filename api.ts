import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "accept": 'application/json',
  }
})

apiClient.interceptors.request.use(function(config) {
  config.headers['Authorization'] = `Bearer ${API_KEY}`
  return config;
}, function(error) {
  console.log(error)
  return Promise.reject(error);
});


export default apiClient;



