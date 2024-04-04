import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useLocation } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import PaymentGreeting from '../components/PaymentGreeting';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaymentTakePage = () => {
  const { paymentIntentId } = useParams();
  const query = useQuery();
  const stripeAccountId = query.get("account");
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(''); 
  const [paymentInfo, setPaymentInfo] = useState({
    customerName: '',
    companyName: '',
    amount: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
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
        setPaymentStatus(data.status); 
        setPaymentInfo({
          customerName: data.customerName,
          companyName: data.businessName,
          amount: data.amount
        });
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
    };

    fetchPaymentInfo();
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
        <div className="ErrorWrapper">
          <div className="ErrorMessage">
            {error}
          </div>
        </div>
      ) : paymentStatus === 'succeeded' ? (
        
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <img src="https://zeuxinnovation.com/wp-content/uploads/2023/04/maximising-user-satisfaction-1.jpg" alt="Success" className="img-fluid mb-4" style={{ maxWidth: '500px' }} />
          <h2 className="text-success">Payment Already Received, Thank You!</h2>
          <p>Your support and trust in FlexiPay mean the world to us.</p>
        </div>
       ) : paymentStatus === 'canceled' ? ( //want an error message to display if the payment intent has been cancelled by the sender
       <div className="d-flex flex-column align-items-center justify-content-center vh-100">
         <h2 className="text-danger">Payment Cancelled</h2>
         <p>The payment of {Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(paymentInfo.amount / 100)} has been cancelled by the sender. Please contact {paymentInfo.companyName || 'the sender'} for any further queries on this.</p>
       </div>
     ) : clientSecret ? (
        //ONLY rendering the payment form if the payment status is not succeeded
        <div>
          <PaymentGreeting 
            customerName={paymentInfo.customerName} 
            companyName={paymentInfo.companyName} 
            amount={paymentInfo.amount} 
            logoUrl={process.env.PUBLIC_URL + "/logo.png"}/>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}> 
            <CheckoutForm clientSecret={clientSecret} stripeAccountId={stripeAccountId}/>
          </Elements>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default PaymentTakePage;
