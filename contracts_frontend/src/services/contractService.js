import api from '../api/axios';

export const ContractService = {
  async getAll(params) {
    const response = await api.get('/contracts', {
      params: {
        ...params,
        page: params.page || 1
      }
    });
    return response;
  },

  async getById(id) {
    const response = await api.get(`/contracts/${id}`);
    return response.data;
  },

  async create(contractData) {
    try {
      const response = await api.post('/contracts', contractData);
      return response.data;
    } catch (error) {
      error.customMessage = error.response?.data?.message || 'Failed to create contract';
      throw error;
    }
  },

  async update(id, contractData) {
    try {
      const response = await api.put(`/contracts/${id}`, contractData);
      return response.data;
    } catch (error) {
      error.customMessage = error.response?.data?.message || 'Failed to update contract';
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/contracts/${id}`);
      return response.data;
    } catch (error) {
      error.customMessage = error.response?.data?.message || 'Failed to delete contract';
      throw error;
    }
  },

  async generateReference() {
    try {
      const response = await api.post('/contracts/generate-reference');
      return response.data.reference;
    } catch (error) {
      console.log(error)
      error.customMessage = error.response?.data?.message || 'Failed to generate reference';
      throw error;
    }
  }
};