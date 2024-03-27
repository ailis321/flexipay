import { useState, useEffect, useCallback } from 'react';
import { useLogout } from './useLogout'; 
import { useNavigate } from 'react-router-dom'; 

const useRetrieveClients = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate(); 
  const { logout } = useLogout(); 

  const retrieveClients = useCallback(async (token) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/clients/get-customers', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        setIsLoading(false);
        if (response.status === 401) {
          logout(); //want to logout to clear the token and ensure customer goes to login page and not dashboard so can reset token
          navigate('/login'); 
          return;
        }
        const responseData = await response.json();
        console.error('Error response:', response.status, responseData);
        setError(responseData.error || 'Failed to retrieve clients');
        return;
      }

      const responseData = await response.json();
      setIsLoading(false);
      setClients(responseData);
      console.log('Clients retrieved:', responseData);
  
    } catch (error) {
      console.error('Error retrieving clients:', error);
      setIsLoading(false);
      setError('An error occurred while retrieving the clients');
    }
  }, []); 

  useEffect(() => {
    //Resetting the error 
    setError(null);
  }, []);

  return { clients, retrieveClients, isLoading, error };
};

export default useRetrieveClients;
