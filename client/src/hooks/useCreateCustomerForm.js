import { useState } from 'react';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';

export const useCreateCustomerForm = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthenticationContext();

  const createCustomer = async ({ firstName, surname, email, phone }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clients/create-customer-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${user.user.token}`
        },
        body: JSON.stringify({ firstName, surname, email, phone })
      });

      if (!response.ok) {
        setIsLoading(false);
        const responseData = await response.json();
      
        // if cant get error from backend, set error to generic message
        setError(responseData.error || 'Failed to create customer');
        return;
      }

      const responseData = await response.json();
      console.log('Customer created:', responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating customer:', error);
      setIsLoading(false);
      setError('An error occurred while creating the customer');
    }
  };

  return { createCustomer, isLoading, error };
};
