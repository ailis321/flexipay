import { useState, useEffect, useCallback } from 'react';
import { useLogout } from './useLogout'; 
import { useNavigate } from 'react-router-dom'; 

const useGetAllCustomers = (token) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate(); 
  const { logout } = useLogout(); 

  const getAllCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/clients/get-all-customers', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        setIsLoading(false);
        if (response.status === 401) {
          logout(); // Logout to clear the token and redirect to login page
          navigate('/login');
          return;
        }
        const responseData = await response.json();
        setError(responseData.error || 'Failed to retrieve all customers');
        return;
      }

      const responseData = await response.json();
      setCustomers(responseData); 
      console.log('All customers retrieved:', responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error retrieving all customers:', error);
      setIsLoading(false);
      setError('An error occurred while retrieving all customers');
    }
  }, []); 


  useEffect(() => {
    if(token) {
      getAllCustomers();
    }
  }, []);

  return { customers, isLoading, error };
};

export default useGetAllCustomers;
