import { useState, useEffect } from 'react';
import { ContractService } from '../../../services/contractService';

export const useContracts = (filters) => {
  const [state, setState] = useState({
    contracts: [],
    pagination: {},
    isLoading: true,
    error: null
  });

  const loadContracts = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const params = {
        client_id: filters.client_id || '',
        start_date: filters.start_date?.format('YYYY-MM-DD') || '',
        reference: filters.reference || '',
        page: filters.page || 1
      };

      const { data } = await ContractService.getAll(params);
      setState({
        contracts: data.data,
        pagination: {
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
          from: data.from,
          to: data.to
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error loading contracts:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || 'Error loading contracts'
      }));
    }
  };

  useEffect(() => {
    loadContracts();
  }, [filters]);

  return { ...state, reload: loadContracts };
};