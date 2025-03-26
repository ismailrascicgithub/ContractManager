import api from '../api/axios';

export const ClientService = {
  async getAll() {
    try {
      const response = await api.get('/clients');
      console.log("called");

      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch clients');
    }
  },

  async create(clientData) {
    try {
      const response = await api.post('/clients', clientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create client');
    }
  },

  async update(id, clientData) {
    try {
      const response = await api.put(`/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update client');
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete client');
    }
  }
};
