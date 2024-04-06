import { useState } from 'react';

const useCreatePaymentLink = (token) => {
  const [paymentLink, setPaymentLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentLink = async ({ amount, description, customerId, email }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          description,
          customerId,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment link');
      }

      const responseData = await response.json();
      setPaymentLink(responseData.paymentLink);
    } catch (error) {
      console.error('Error creating payment link:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createPaymentLink, paymentLink, isLoading, error };
};

export default useCreatePaymentLink;
