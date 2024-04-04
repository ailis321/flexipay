import { useState, useEffect } from 'react';

const useGetIntents = (token) => {
  const [intents, setIntents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noIntents, setNoIntents] = useState(false); 

  useEffect(() => {
    const fetchGetIntents = async () => {
      setIsLoading(true);
      setError(null); 
      setNoIntents(false); 

      try {
        const response = await fetch('/api/dashboard/payment-intents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setNoIntents(true); 
            console.log('No intents found ', response.status);
          }
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        setIntents(data.data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchGetIntents();
    }
  }, [token]);

  return { intents, isLoading, error, noIntents }; 
};

export default useGetIntents;
