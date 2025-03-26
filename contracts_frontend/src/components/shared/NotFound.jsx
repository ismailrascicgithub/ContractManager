import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" color="error">
        404 - Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;