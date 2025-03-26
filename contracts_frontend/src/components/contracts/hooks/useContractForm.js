import { useCallback, useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { ContractService } from '../../../services/contractService';
import { getErrorMessage } from '../../../utils/errorHandler';

const useContractForm = (contract, { user, enqueueSnackbar, navigate }) => {
  const defaultValues = useMemo(() => ({
    reference: '',
    client_id: '',
    start_date: null,
    duration: 12,
    value: 0
  }), []);

  const form = useForm({ defaultValues });
  const { control, handleSubmit, formState: { errors }, reset, setError } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const initialContractValues = useMemo(() => {
    if (!contract) return null;
    return {
      ...contract,
      start_date: contract.start_date ? dayjs(contract.start_date) : null,
      client_id: contract.client_id?.toString()
    };
  }, [contract]);

  useEffect(() => {
    initialContractValues ? reset(initialContractValues) : reset(defaultValues);
  }, [initialContractValues, reset, defaultValues]);

  const preparePayload = useCallback((formData) => ({
    ...formData,
    start_date: formData.start_date?.format('YYYY-MM-DD'),
    duration: Number(formData.duration),
    value: Number(formData.value),
    user_id: user.id
  }), [user.id]);

  const onSubmit = useCallback(async (formData) => {
    try {
      setIsSubmitting(true);
      const payload = preparePayload(formData);

      contract?.id
        ? await ContractService.update(contract.id, payload)
        : await ContractService.create(payload);

      enqueueSnackbar('Contract saved successfully', { variant: 'success' });
      navigate('/contracts');
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          setError(field, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(', ') : messages
          });
        });
      } else {
        enqueueSnackbar(
          getErrorMessage(error, 'Error saving contract'),
          { variant: 'error' }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [contract, preparePayload, enqueueSnackbar, navigate, setError]);

  const generateReference = useCallback(async () => {
    try {
      setIsGenerating(true);
      const generatedRef = await ContractService.generateReference();
      return generatedRef;
    } catch (error) {
      enqueueSnackbar(
        getErrorMessage(error, 'Error generating reference'), 
        { variant: 'error' }
      );
      return '';
    } finally {
      setIsGenerating(false);
    }
  }, [enqueueSnackbar]);

  return {
    form,
    control,
    errors,
    isSubmitting,
    isGenerating,
    handleSubmit,
    onSubmit,
    generateReference
  };
};

export default useContractForm;