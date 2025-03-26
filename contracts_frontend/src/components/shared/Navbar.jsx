import { 
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    Avatar
  } from '@mui/material';
  import { useAuth } from '../../contexts/AuthContext';
  
  export default function Navbar() {
    const { user, logout } = useAuth();
  
    return (
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ mr: 2, bgcolor: 'secondary.main' }}
              />
              Contract Management
            </Box>
          </Typography>
          
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="subtitle1">
                {user.name} ({user.role})
              </Typography>
              <Button
                color="inherit"
                variant="outlined"
                onClick={logout}
                sx={{ borderColor: 'white' }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
  }