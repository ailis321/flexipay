import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

export const useAuthenticationContext = () => {
  const authContext = useContext(AuthenticationContext);

    if (!authContext) {
        throw new Error('useAuthenticationContext must be used within an AuthenticationProvider');
    }

  return authContext;
};


