import { Component } from 'react';
import { Alert, Button, Box } from '@mui/material';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Something went wrong: {this.state.error.message}
          </Alert>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleReset}
          >
            Reload Application
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}