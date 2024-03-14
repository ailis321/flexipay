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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        setIsLoading(false); 
        const responseData = await response.json(); 
        // retreive error message from the backend
        setError(responseData.error); 
        return;
      }

      if(response.ok){
        //if no error, successful login
        const responseData = await response.json(); 
    
        console.log('User logged in : ', responseData);
           
        //Saving the user to local storage which includes the JWT token
         localStorage.setItem('user', JSON.stringify(responseData));

        // Updating authentication context as logged in
        dispatch({ type: 'LOGIN', payload: responseData });
        setIsLoading(false); 

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
