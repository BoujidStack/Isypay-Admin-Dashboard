// requireAuth.js
import React from 'react';
import { useAuthNavigate } from './useAuthNavigate';

const requireAuth = (Component) => {
  return (props) => {
    const navigateToLogin = useAuthNavigate();

    React.useEffect(() => {
      navigateToLogin();
    }, []);

    return <Component {...props} />;
  };
};

export default requireAuth;
