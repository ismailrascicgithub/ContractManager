import React, { memo } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import ClientSelect from '../clients/ClientSelect';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import useContractForm from './hooks/useContractForm';
import { Controller } from 'react-hook-form';

const ContractForm = memo(({ contract }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    errors,
    isSubmitting,
    isGenerating,
    handleSubmit,
    onSubmit,
    generateReference
  } = useContractForm(contract, { user, enqueueSnackbar, navigate });

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {contract ? 'Edit Contract' : 'New Contract'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="reference"
              control={control}
              rules={{ required: 'Required field' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Reference"
                  error={!!errors.reference}
                  helperText={errors.reference?.message}
                  InputProps={{
                    endAdornment: !contract && (
                      <InputAdornment position="end">
                        <Button
                          onClick={async () => {
                            const generatedRef = await generateReference();
                            field.onChange(generatedRef);
                          }}
                          size="small"
                          disabled={!!contract || isGenerating}
                          startIcon={isGenerating && <CircularProgress size={20} />}
                        >
                          {isGenerating ? 'Generating...' : 'Generate'}
                        </Button>
                      </InputAdornment>
                    )
                  }}
                  disabled={!!contract}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="client_id"
              control={control}
              rules={{ required: 'Required field' }}
              render={({ field }) => (
                <ClientSelect
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.client_id}
                  helperText={errors.client_id?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="start_date"
              control={control}
              rules={{ required: 'Required field' }}
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.start_date,
                      helperText: errors.start_date?.message
                    }
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="duration"
              control={control}
              rules={{
                required: 'Required field',
                min: { value: 1, message: 'Minimum 1 month' },
                max: { value: 120, message: 'Maximum 120 months' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Duration (months)"
                  type="number"
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="value"
              control={control}
              rules={{
                required: 'Required field',
                min: { value: 0, message: 'Minimum value €0' },
                max: { value: 1000000, message: 'Maximum value €1,000,000' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Value"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>
                  }}
                  error={!!errors.value}
                  helperText={errors.value?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Saving...' : 'Save Contract'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
});

ContractForm.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.number,
    reference: PropTypes.string,
    client_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    start_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    duration: PropTypes.number,
    value: PropTypes.number,
  })
};

ContractForm.defaultProps = {
  contract: null
};

export default ContractForm;