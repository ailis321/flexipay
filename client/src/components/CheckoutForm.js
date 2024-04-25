import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; 

export default function CheckoutForm({ clientSecret, stripeAccountId, logo, colour, businessName, paymentIntentId}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      console.error('Stripe.js has not yet loaded');
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
      console.error('Stripe.js has not yet loaded or elements not available.');
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/pay/success?paymentIntentId=${paymentIntentId}&account=${stripeAccountId}`,
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      console.error('Failed to confirm payment:', error);
    } 
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <section className="bg-light py-5">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: colour }}>
          <img src={logo} alt="Logo" style={{ maxWidth: '50px', marginRight: '10px', paddingBottom: '20px' }} />
          <p style={{ color: colour }}>{businessName}</p>
        </div>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
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
