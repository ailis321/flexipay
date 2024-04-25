import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    status: '',
    amount: 0,
    receiptEmail: '',
  });
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentIntentId = queryParams.get('paymentIntentId');
  const stripeAccountId = queryParams.get('account');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      setLoading(true);
      const url = new URL(`/api/payment-client/confirmation-payment/${paymentIntentId}`, window.location.origin);
      url.searchParams.append('account', stripeAccountId);

      try {
        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPaymentDetails({
          status: data.status,
          amount: data.amount,
          receiptEmail: data.receiptEmail,
        });
      } catch (error) {
        console.error('Failed to fetch payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (paymentIntentId && stripeAccountId) {
      fetchPaymentDetails();
    }
  }, [paymentIntentId, stripeAccountId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner"></div>  
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img src="https://zeuxinnovation.com/wp-content/uploads/2023/04/maximising-user-satisfaction-1.jpg" alt="Success" className="img-fluid mb-4" style={{ maxWidth: '500px' }} />
      <h2 className="text-success">Payment Details</h2>
      <p>Thank you for using FlexiPay. A confirmation email has been sent to {paymentDetails.receiptEmail}.</p>
      <p>Your payment of £{paymentDetails.amount} has a status of "{paymentDetails.status}".</p>
    </div>
  );
};

export default PaymentSuccessPage;
