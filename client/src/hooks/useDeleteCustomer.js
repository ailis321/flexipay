import { useState } from 'react';

const useDeleteCustomer = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 

  const deleteCustomer = async (customerId) => {
      setIsDeleting(true);
      setError(null);
      setSuccess(false); 
      try {
          const user = JSON.parse(localStorage.getItem('user'));
          const token = user.token;

          const response = await fetch(`/api/clients/delete-customer/${customerId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorisation': `Bearer ${token}` 
              },
          });
          if (!response.ok) throw new Error('Failed to delete customer');

          setSuccess(true); 
          setIsDeleting(false);
          return true; 
      } catch (err) {
          setError(err.message);
          setIsDeleting(false);
          return false; 
      }
  };

  return { deleteCustomer, isDeleting, error, success };
};

export default useDeleteCustomer;