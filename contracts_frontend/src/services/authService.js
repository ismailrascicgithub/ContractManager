import api from '../api/axios';

export const AuthService = {
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      error.customMessage = error.response?.data?.message || 'Login failed';
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      error.customMessage = error.response?.data?.message || 'Logout failed';
      throw error;
    }
  },

  async getUser() {
    try {
      const response = await api.get('/user');
      if (!response.data?.id) throw new Error('Invalid user data');
      return response.data;
    } catch (error) {
      error.customMessage = 'Session expired. Please login again.';
      throw error;
    }
  },

  async refreshToken() {
    try {
      await api.post('/refresh-token');
    } catch (error) {
      throw new Error('Failed to refresh session');
    }
  }
};