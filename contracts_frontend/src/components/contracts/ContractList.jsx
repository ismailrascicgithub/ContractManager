import React from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  CircularProgress, 
  Button,
  Alert 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useContracts } from './hooks/useContracts';
import ContractTable from './ContractTable';
import Filters from './Filters';
import PaginationControls from './PaginationControls';
import ContractCommentsModal from './ContractCommentsModal';
import { useNavigate } from 'react-router-dom';

const ErrorAlert = ({ message }) => (
  <Alert severity="error" sx={{ mb: 3 }}>
    {message}
  </Alert>
);

export default function ContractList() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [filters, setFilters] = React.useState({
    client_id: '',
    start_date: null,
    reference: '',
    page: 1
  });

  const [selectedContract, setSelectedContract] = React.useState(null);
  const { contracts, pagination, isLoading, error, reload } = useContracts(filters);

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleEditContract = (contract) => {
    navigate(`/contracts/edit/${contract.id}`);
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Filter Contracts</Typography>
          {isAdmin && (
            <Button
              variant="contained"
              onClick={() => navigate('/contracts/new')}
            >
              New Contract
            </Button>
          )}
        </Box>

        <Filters
          filters={filters}
          onFilterChange={setFilters}
          isAdmin={isAdmin}
        />
      </Paper>

      {error && <ErrorAlert message={error} />}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ContractTable
            contracts={contracts}
            isAdmin={isAdmin}
            onCommentClick={setSelectedContract}
            onEdit={handleEditContract}
          />

          {pagination.last_page > 1 && (
            <PaginationControls
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <ContractCommentsModal
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
        onUpdate={reload}
      />
    </Container>
  );
}