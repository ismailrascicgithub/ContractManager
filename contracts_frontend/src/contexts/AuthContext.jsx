import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthService } from '../services/authService';
import { getErrorMessage } from '../utils/errorHandler';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const checkAuth = useCallback(async (suppressError = false) => {
    let isMounted = true;

    try {
      const user = await AuthService.getUser();
      if (isMounted) {
        setState(prev => ({
          ...prev,
          user,
          loading: false,
          error: null
        }));
      }
    } catch (error) {
      if (isMounted) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: suppressError ? null : getErrorMessage(error)
        }));
        
        if (error.response?.status === 401) {
          navigate('/login', {
            state: { from: locationRef.current },
            replace: true
          });
        }
      }
    }

    return () => { isMounted = false };
  }, [navigate]);

  useEffect(() => {
    checkAuth(true);
  }, []);

  const login = useCallback(async (email, password) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      await AuthService.login(email, password);
      const user = await AuthService.getUser();
      
      setState(prev => ({
        ...prev,
        user,
        loading: false,
        error: null
      }));
      
      navigate(locationRef.current.state?.from?.pathname || '/contracts', {
        replace: true
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: getErrorMessage(error)
      }));
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setState(prev => ({ ...prev, user: null }));
      navigate('/login', { replace: true });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: getErrorMessage(error)
      }));
    }
  }, [navigate]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll'];
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, 30 * 60 * 1000);
    };

    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{
      ...state,
      isAdmin: state.user?.role === 'admin',
      login,
      logout
    }}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};