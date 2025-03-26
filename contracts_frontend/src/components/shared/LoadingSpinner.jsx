import { CircularProgress } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <CircularProgress size={60} />
    </div>
  );
}