import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/shared/Layout';
import LoadingContainer from '../components/shared/LoadingContainer';
import Login from '../components/auth/Login';
import NotFound from '../components/shared/NotFound';

const ContractList = lazy(() => import('../components/contracts/ContractList'));
const ContractFormPage = lazy(() => import('../components/contracts/ContractFormPage'));

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense fallback={<LoadingContainer />}>
              <ContractList />
            </Suspense>
          } />
          
          <Route path="/contracts">
            <Route index element={
              <Suspense fallback={<LoadingContainer />}>
                <ContractList />
              </Suspense>
            } />
            <Route path="new" element={
              <Suspense fallback={<LoadingContainer />}>
                <ContractFormPage mode="create" />
              </Suspense>
            } />
            <Route path="edit/:id" element={
              <Suspense fallback={<LoadingContainer />}>
                <ContractFormPage mode="edit" />
              </Suspense>
            } />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="*" element={<PublicRoute />} />
    </Routes>
  );
};

export default AppRouter;