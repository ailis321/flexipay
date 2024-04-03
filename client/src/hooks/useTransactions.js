import { useState, useEffect } from 'react';

const useTransactions = (token) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noTransactions, setNoTransactions] = useState(false); 

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null); 
      setNoTransactions(false); 

      try {
        const response = await fetch('/api/dashboard/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setNoTransactions(true); 
          }
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data.data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return { transactions, isLoading, error, noTransactions }; 
};

export default useTransactions;
