import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {

  const [paymentDetails, setPaymentDetails] = useState({
    status: '',
    amount: 0,
    receiptEmail: '',
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentIntentId = queryParams.get('paymentIntentId');
  const stripeAccountId = queryParams.get('account');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const url = new URL(`/api/payment-client/confirmation-payment/${paymentIntentId}`, window.location.origin);
      url.searchParams.append('account', stripeAccountId);

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
    };

    if (paymentIntentId && stripeAccountId) {
      fetchPaymentDetails();
    }
  }, [paymentIntentId, stripeAccountId]);

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
