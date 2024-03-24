import { useState } from 'react';
import { useAuthenticationContext } from './useAuthenticationContext';


export const useLoginForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthenticationContext();
 


  const login = async ({ email, password}) => {

    setIsLoading(true);
    setError(null);


    try {
      const response = await fetch('/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json()

      if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
      }
      if (response.ok) {
        
        localStorage.setItem('user', JSON.stringify(json))
  
        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
  
        // update loading state
        setIsLoading(false)
      }
      
    } catch (error) {
      console.error('Error Logging in', error);
      setIsLoading(false); 
      setError('An error occurred while logging in'); 
    }
  };
  // return the function and the loading state and error
  return { login, isLoading, error };
};
