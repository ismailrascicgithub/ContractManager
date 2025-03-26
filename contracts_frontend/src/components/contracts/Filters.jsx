import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import ClientSelect from '../clients/ClientSelect';
import PropTypes from 'prop-types';

const Filters = ({ filters, onFilterChange, isAdmin }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(localFilters);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [localFilters.reference, localFilters.client_id, localFilters.start_date]);

  const handleChange = (name, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <ClientSelect
          value={localFilters.client_id}
          onChange={value => handleChange('client_id', value)}
        />
      </Grid>
      
      <Grid item xs={12} md={3}>
        <DatePicker
          label="Start Date"
          value={localFilters.start_date}
          onChange={value => handleChange('start_date', value)}
          slotProps={{ 
            textField: { 
              fullWidth: true,
              error: false
            } 
          }}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Search Reference"
          value={localFilters.reference}
          onChange={e => handleChange('reference', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    client_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    start_date: PropTypes.object,
    reference: PropTypes.string,
    page: PropTypes.number
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool
};

export default Filters;