import React from 'react';
import { Pagination, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const PaginationControls = ({ pagination, onPageChange }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mt: 3, 
      px: 2 
    }}>
      <Typography variant="body2" color="textSecondary">
        Showing {pagination.from} - {pagination.to} of {pagination.total}
      </Typography>
      
      <Pagination
        count={pagination.last_page}
        page={pagination.current_page}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
        showFirstButton
        showLastButton
        sx={{ 
          '& .MuiPagination-ul': { justifyContent: 'center' },
          my: 2
        }}
      />
    </Box>
  );
};

PaginationControls.propTypes = {
  pagination: PropTypes.shape({
    current_page: PropTypes.number.isRequired,
    last_page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationControls;