import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useLocation } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaymentTakePage = () => {
  const { paymentIntentId } = useParams();
  const query = useQuery();
  const stripeAccountId = query.get("account");
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/payment-client/get-client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentIntentId, stripeAccountId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(`Error: ${errorData.error || 'An unexpected error occurred.'}`);
          return;
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    };

    fetchClientSecret();
  }, [paymentIntentId, stripeAccountId]);

  const stripePromise = loadStripe('pk_test_51O5DdBCkhYVN3YDQno05RFtCiRGflPMJoTmbVeqlwrOt011CgAXdhH6qG2jGY7bLVICyq0aFUVkkCJrRUcZMf3nJ00q8uRQQ5B', {
    stripeAccount: stripeAccountId
  });

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

  return (
    <div className="PaymentTakePage">
      {error ? (
        <div className="ErrorMessage">
          {error}
        </div>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}> 
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : <p>Loading...</p>}
    </div>
  );
      }  

export default PaymentTakePage;
