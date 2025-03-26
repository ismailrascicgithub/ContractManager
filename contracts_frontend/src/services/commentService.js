import api from '../api/axios';

export const CommentService = {
  async getForContract(contractId) {
    try {
      const response = await api.get(`/contracts/${contractId}/comments`);
      return response.data;
    } catch (error) {
      error.customMessage = error.response?.data?.message || 'Failed to fetch comments';
      throw error;
    }
  },

  async addComment(contractId, comment) {
    try {
      const response = await api.post(`/contracts/${contractId}/comments`, { comment });
      return response.data;
    } catch (error) {
      const backendError = error.response?.data?.error;
      error.customMessage = error.response?.data?.message || 'Failed to create comment';
      
      if (backendError === 'comment_authorization_error') {
        error.customMessage = 'You are not authorized to add comments';
      }
      
      throw error;
    }
  },

  async deleteComment(commentId) {
    try {
      await api.delete(`/comments/${commentId}`);
    } catch (error) {
      const backendError = error.response?.data?.error;
      error.customMessage = error.response?.data?.message || 'Failed to delete comment';
      
      if (backendError === 'comment_authorization_error') {
        error.customMessage = 'You are not authorized to delete this comment';
      }
      
      throw error;
    }
  }
};