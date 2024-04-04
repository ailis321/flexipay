
import { useState } from 'react';

const useCancelPaymentIntent = () => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  const cancelPaymentIntent = async (paymentIntentId) => {
    setIsCancelling(true);
    setCancelError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      const response = await fetch('/api/payment/cancel-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentIntentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel payment intent');
      }

      await response.json(); //no need to store the response data 
      setIsCancelling(false);
      return true; //success
    } catch (error) {
      console.error('Error cancelling payment intent:', error);
      setCancelError(error.message);
      setIsCancelling(false);
      return false; //failure
    }
  };

  return { cancelPaymentIntent, isCancelling, cancelError };
};

export default useCancelPaymentIntent;
