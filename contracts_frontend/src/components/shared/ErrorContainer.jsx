import { Alert } from '@mui/material';

export default function ErrorContainer({ message }) {
  return (
    <Alert severity="error" sx={{ m: 2 }}>
      {message}
    </Alert>
  );
}