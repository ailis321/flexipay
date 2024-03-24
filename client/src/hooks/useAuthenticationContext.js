import { AuthenticationContext } from '../context/AuthenticationContext';
import { useContext } from 'react';

export const useAuthenticationContext = () => {
  const authContext = useContext(AuthenticationContext);

    if (!authContext) {
        throw new Error('useAuthenticationContext must be used within an AuthenticationProvider');
    }

  return authContext;
};


