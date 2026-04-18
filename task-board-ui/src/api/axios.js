import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5245/api', 
});

export default api;