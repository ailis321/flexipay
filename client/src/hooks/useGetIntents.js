import { useState, useEffect } from 'react';

const useGetIntents = (token) => {
  const [intents, setIntents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noIntents, setNoIntents] = useState(false); // You may or may not need this anymore

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
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        if (data.data.length === 0) {
          console.log('response data:', data);
          setError('No payment intents found');
          throw new Error('No payment intents found');
          setNoIntents(true);
          console.log('No payment intents found');

        } else {
          setIntents(data.data);
        }
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
