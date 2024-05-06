import { useState } from 'react';

const useStorePreferences = (token) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const storePreferences = async (preferences) => {
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await fetch('/api/organisations/set-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json(); 

      if (!response.ok) {
        // Use the parsed JSON to get more specific error messages, if available
        const errorMessage = data?.message || 'Failed to save preferences due to a server error';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      setIsSaving(false);
      return data;
    } catch (err) {

      if (err.name === 'AbortError') {
        setError('The request was aborted.');
      } else if (!navigator.onLine) {
        setError('No internet connection. Please check your network settings.');
      } else {
   
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error(err); 
      setIsSaving(false);
      return null;
    }
  };

  return {
    isSaving,
    error,
    storePreferences,
  };
};

export default useStorePreferences;
