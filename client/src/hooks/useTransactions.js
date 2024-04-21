import { useState, useEffect } from 'react';

const useTransactions = (token) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/dashboard/transactions', {
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
          setError('No transactions found');
          setTransactions([]);
          console.log('No transactions found, but response is successful.');
        } else {
          setTransactions(data.data);
        }
      } catch (error) {
        setError(`Failed to load transactions: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return { transactions, isLoading, error };
};

export default useTransactions;
