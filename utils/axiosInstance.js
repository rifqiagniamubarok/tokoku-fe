import axios from 'axios';
import { getCookie } from 'cookies-next';
import Router from 'next/router';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    const auth_ls = localStorage.getItem('auth');
    const auth_ls_parse = JSON.parse(auth_ls);
    const role = auth_ls_parse.role;

    if (Router.pathname.includes('admin') && role !== 'admin') {
      Router.push('/home');
    }

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 error (Unauthorized)
    if (error.response && error.response.status === 401) {
      Router.push('/');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
