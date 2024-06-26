// this is the page that the recipient of the payment link will see
// it will display the payment form and the payment details asking for card info
// the payment form will be handled by stripe 
// no need to be logged in here so not checking for user token
// needs a public stripe key to load the stripe elements
// payment form will only render if status of the intent is not succeeded
// if status is cancelled (by sender) then relevant message will be displayed to user 

import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useLocation } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import PaymentGreeting from '../components/PaymentGreeting';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';

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
  const [preferences, setPreferences] = useState({
    colour: '',
    logoUrl: '',
    displayedBusinessName: '',
    paymentMessage: '',
    businessContactNumber: '',
    businessEmailAddress: '',

  }); 


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
        setPreferences({
          colour: data.preferences.colour,
          logoUrl: data.preferences.logo,
          displayedBusinessName: data.preferences.displayedBusinessName,
          paymentMessage: data.preferences.customMessageForPaymentLink,
          businessContactNumber: data.preferences.businessContactNumber,
          businessEmailAddress: data.preferences.businessEmailAddress,
        });
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
      colorPrimary: preferences.colour || '#53937d',
      colorBackground: '#ffffff', 
      colorText: '#333333',
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
        <CustomHeader
      color={preferences.colour || '#53937d'}
      companyName={preferences.displayedBusinessName || paymentInfo.companyName}
      logoUrl={preferences.logoUrl}
    />
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
        //ONLY rendering the payment form if the payment status is not succeeded i.e its not been taken already.
        <div>
          <PaymentGreeting 
            customerName={paymentInfo.customerName} 
            companyName={preferences.displayedBusinessName || paymentInfo.companyName} 
            amount={paymentInfo.amount} 
            message={preferences.paymentMessage}
            logoUrl={preferences.logoUrl}/>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}> 
            <CheckoutForm clientSecret={clientSecret} stripeAccountId={stripeAccountId} logo={preferences.logoUrl} colour={preferences.colour} businessName={preferences.displayedBusinessName} paymentIntentId ={paymentIntentId}/>
          </Elements>
        </div>
      ) : <p>Loading...</p>}
      <CustomFooter
        email={preferences.businessEmailAddress}
        phone={preferences.businessContactNumber}
        colour={preferences.colour}
        businessName={preferences.displayedBusinessName}
      />
    </div>


  );
}

export default PaymentTakePage;
