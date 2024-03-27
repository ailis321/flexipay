import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51O5DdBCkhYVN3YDQno05RFtCiRGflPMJoTmbVeqlwrOt011CgAXdhH6qG2jGY7bLVICyq0aFUVkkCJrRUcZMf3nJ00q8uRQQ5B', {
  stripeAccount: 'acct_1OtGRvEDU39wlrlV'
});

const PaymentTakePage = () => {
  const { paymentIntentId } = useParams();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        const response = await fetch('/api/payment/get-client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`, 
          },
          body: JSON.stringify({ paymentIntentId })
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClientSecret();
  }, [paymentIntentId]);


  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#53937d', 
      colorBackground: '#ffffff', 
      colorText: '#53937d', 
      colorDanger: '#df1b41', 
      fontFamily: 'Arial, sans-serif', 
      spacingUnit: '8px', 
      borderRadius: '10px', 
      fontSizeBase: '16px', 
      lineHeightBase: '22px', 
    },
    rules: {
      '.Input': {
        border: '1px solid #e6ebf1',
        height: '30px', 
        marginTop: '8px', 
        marginBottom: '15px', 
      },
      '.Block': {
        padding: '12px', 
      },
      '.Label': {
        marginBottom: '8px', 
      }
    }
  };
  

  const options = {
    clientSecret,
    appearance, 
  };

  return (
    <div className="PaymentTakePage">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}> 
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentTakePage;
