import { useState } from 'react';
import { useAuthenticationContext } from './useAuthenticationContext';
import { useNavigate } from 'react-router-dom'; 

export const useLoginForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthenticationContext();
  const navigate = useNavigate(); 

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

      // Save to local storage and update the context
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });

      // Check the onboarding and preferences states
      if (!json.onboardingComplete) {
        // Redirect to Stripe onboarding using the link from the server
        window.location.href = json.accountLink; 
        return;
      } else if (json.redirectToPreferences) {
   
        navigate('/preferences');
        return;
      } else {

        navigate('/dashboard');
      }
      
      setIsLoading(false);

    } catch (error) {
      console.error('Error Logging in', error);
      setIsLoading(false);
      setError('An error occurred while logging in');
    }
  };

  return { login, isLoading, error };
};
