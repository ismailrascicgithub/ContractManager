export const getErrorMessage = (error, fallback = 'An error occurred') => {
  if (typeof error === 'string') return error;
  
  return error.response?.data?.message 
    || error.customMessage 
    || error.message 
    || fallback;
};

export const handleApiError = (error) => {
  const message = getErrorMessage(error);
  console.error('API Error:', message);
  return message;
};