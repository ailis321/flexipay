import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; 

export default function CheckoutForm({ clientSecret, stripeAccountId }) { 
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      console.error('No client secret found');
      return;
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not yet loaded.');
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent) {
      switch (paymentIntent.status) {
        case 'succeeded':
          
          navigate(`/pay/success?paymentIntentId=${paymentIntent.id}&account=${stripeAccountId}`);
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          setIsLoading(false);
          break;
        default:
          setMessage('Something went wrong.');
          setIsLoading(false);
          break;
      }
    }
  };

  return (
    <section className="bg-light py-5">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#53937d' }}>
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" style={{ maxWidth: '50px', marginRight: '10px' }} />
          <p>FlexiPay Ltd</p>
        </div>
        <PaymentElement />
        <button disabled={isLoading || !stripe || !elements} type="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </section>
  );
}
