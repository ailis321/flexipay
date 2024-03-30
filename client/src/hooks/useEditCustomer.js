import { useState } from 'react';

const useEditCustomer = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
  
    const editCustomer = async (customerId, customerData) => {
      setIsEditing(true);
      setError(null);
      try {

        const user = JSON.parse(localStorage.getItem('user'));
        console.log('user paymnt link page :', user);
        const token = user.token;
        console.log('token from edit page :', token);
     
        const response = await fetch(`/api/clients/edit-customer/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`
          },
          body: JSON.stringify(customerData),
        });
        if (!response.ok) throw new Error('Failed to edit customer');

        setIsEditing(false);
      } catch (err) {
        setError(err.message);
        setIsEditing(false);
      }
    };
  
    return { editCustomer, isEditing, error };
  };

  export default useEditCustomer;
  