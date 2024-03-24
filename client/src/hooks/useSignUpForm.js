import { useState } from 'react';
import { useAuthenticationContext } from './useAuthenticationContext';

export const useSignupForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthenticationContext();

  const signupBackend = async ({ firstName, lastName, businessName, email, password, confirmPassword }) => {

    setIsLoading(true);
    setError(null);


    if (password !== confirmPassword) {
      alert("Passwords don't match");
      //reset loading state and return
      setIsLoading(false); 
      return;
    }
    
    try {
      const response = await fetch('/api/accounts/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, businessName, email, password })
      });

      if (!response.ok) {
        setIsLoading(false); 
        const responseData = await response.json(); 
        // retreive error message from the backend
        setError(responseData.error); 
        return;
      }

      //if no error, get data to create account
      const responseData = await response.json(); 
      

      console.log('Account created : ', +responseData);
            
      //Saving the user to local storage which includes the JWT token
      localStorage.setItem('user', JSON.stringify(responseData));
      // Updating authentication context as logged in
      dispatch({ type: 'LOGIN', payload: responseData });
      setIsLoading(false); 

      //// Redirecting the user to the stripe onboarding URL from backend
      window.location.href = responseData.accountLink; 
    } catch (error) {
      console.error('Error creating account:', error);
      setIsLoading(false); 
      setError('An error occurred while creating the account'); 
    }
  };
  // return the function and the loading state and error
  return { signupBackend, isLoading, error };
};
