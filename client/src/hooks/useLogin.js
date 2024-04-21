import { useState } from 'react';
import { useAuthenticationContext } from './useAuthenticationContext';
import { useNavigate } from 'react-router-dom'; // Ensure you import useNavigate from react-router-dom

export const useLoginForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthenticationContext();
  const navigate = useNavigate(); // Use navigate for redirection

  const login = async ({ email, password }) => {
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

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return;
      }

      // Handle onboarding completion check
      if (json.onboardingComplete) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
      } else {
        
        const { token, email, onboardingComplete } = response;
        // Save only the token, email, and onboarding status to local storage
        localStorage.setItem('user', JSON.stringify({ token, email, onboardingComplete }));

        // Updating authentication context as logged in but onboarding is not complete
        dispatch({ type: 'LOGIN', payload: { token, email, onboardingComplete } });
  
        // Redirect user to the onboarding link if onboarding is not complete
        window.location.href = json.accountLink; // Redirect directly
        return;
      }

      // Update loading state
      setIsLoading(false);

    } catch (error) {
      console.error('Error Logging in', error);
      setIsLoading(false);
      setError('An error occurred while logging in');
    }
  };

  // Return the function and the loading state and error
  return { login, isLoading, error };
};
