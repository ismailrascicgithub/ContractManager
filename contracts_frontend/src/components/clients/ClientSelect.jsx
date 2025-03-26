import { memo, useEffect, useState, useCallback, useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import { ClientService } from '../../services/clientService';

const ClientSelect = memo(function ClientSelect({ value, onChange, error, helperText }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const clientOptions = useMemo(() => {
    return clients.map(client => (
      <MenuItem key={client.id} value={client.id}>
        {client.name}
      </MenuItem>
    ));
  }, [clients]);

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadClients = async () => {
      try {
        const { data } = await ClientService.getAll({ 
          signal: abortController.signal 
        });
        setClients(data);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setLoadError('Error loading clients');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadClients();
    return () => abortController.abort();
  }, []);

  return (
    <FormControl fullWidth variant="outlined" error={error}>
      <InputLabel id="client-select-label">Client</InputLabel>
      <Select
        labelId="client-select-label"
        label="Client"
        value={value || ''}
        onChange={handleChange}
        disabled={loading}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            }
          }
        }}
      >
        <MenuItem value=""><em>Select client</em></MenuItem>

        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
            <span style={{ marginLeft: 10 }}>Loading clients...</span>
          </MenuItem>
        ) : (
          clientOptions
        )}
      </Select>
      
      {(error || loadError) && (
        <FormHelperText error>
          {helperText || loadError}
        </FormHelperText>
      )}
    </FormControl>
  );
});

export default ClientSelect;