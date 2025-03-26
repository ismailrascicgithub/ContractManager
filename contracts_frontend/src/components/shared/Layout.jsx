import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;