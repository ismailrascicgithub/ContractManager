import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

let isRefreshingCSRF = false;

api.interceptors.request.use(async (config) => {
  const methodsRequiringCSRF = ['post', 'put', 'patch', 'delete'];

  if (methodsRequiringCSRF.includes(config.method?.toLowerCase())) {
    if (!Cookies.get('XSRF-TOKEN') && !isRefreshingCSRF) {
      isRefreshingCSRF = true;
      try {
        await api.get('/csrf-cookie');
      } finally {
        isRefreshingCSRF = false;
      }
    }
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  }
  return config;
});

let isInitialAuthCheck = true;

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (window.location.pathname === '/login' || isInitialAuthCheck) {
        isInitialAuthCheck = false;
        return Promise.reject(error);
      }

      window.location.href = '/login?session_expired=1';
    }
    return Promise.reject(error);
  }
);

export default api;