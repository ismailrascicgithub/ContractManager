import { Box, CircularProgress } from '@mui/material';

export default function LoadingContainer() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress size={60} />
    </Box>
  );
}