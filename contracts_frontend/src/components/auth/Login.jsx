import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Snackbar,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { login, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('session_expired')) {
      setShowSessionExpired(true);
      params.delete('session_expired');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ 
        mt: 8, 
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2
      }}>
        <Avatar sx={{ 
          m: 1, 
          bgcolor: 'primary.main',
          width: 56,
          height: 56
        }}>
          <LockOutlined fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>

        {showSessionExpired && (
          <Alert severity="warning" sx={{ width: '100%', mb: 2 }}>
            Your session has expired. Please login again.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            error={!!formState.errors.password}
            helperText={formState.errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...register('password', { required: 'Password is required' })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}