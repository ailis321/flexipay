import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [receiptUrl, setReceiptUrl] = useState('');
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
      setReceiptUrl(data.receiptUrl); 
    };

    if (paymentIntentId && stripeAccountId) {
      fetchPaymentDetails();
    }
  }, [paymentIntentId, stripeAccountId]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img src="https://zeuxinnovation.com/wp-content/uploads/2023/04/maximising-user-satisfaction-1.jpg" alt="Success" className="img-fluid mb-4" style={{ maxWidth: '500px' }} />
      <h2 className="text-success">Payment Successful!</h2>
      <p>Thank you for your payment and using FlexiPay.</p>
      {receiptUrl && <p><a href={receiptUrl} target="_blank" rel="noopener noreferrer">View Receipt</a></p>}
    </div>
  );
};

export default PaymentSuccessPage;
