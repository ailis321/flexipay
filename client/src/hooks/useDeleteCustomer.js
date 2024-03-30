import { useState } from 'react';

const useDeleteCustomer = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
  
    const deleteCustomer = async (customerId) => {
      setIsDeleting(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.user.token;
   
        const response = await fetch(`/api/customer/${customerId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`
          },
        });
        if (!response.ok) throw new Error('Failed to delete customer');

        setIsDeleting(false);
      } catch (err) {
        setError(err.message);
        setIsDeleting(false);
      }
    };
  
    return { deleteCustomer, isDeleting, error };
  };

  export default useDeleteCustomer; 
  