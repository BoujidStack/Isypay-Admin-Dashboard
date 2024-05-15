// useAuthNavigate.js
import { useNavigate } from 'react-router-dom';

export const useAuthNavigate = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  return navigateToLogin;
};
