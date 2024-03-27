import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ clientSecret }) { 

  const stripe = useStripe();
  const elements = useElements();

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

    if (!stripe) {
        console.error('Stripe.js has not yet loaded.');
        return;
    }

    setIsLoading(true);


    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
 
        return_url: "http://localhost:3000/payment-success",
    });

    if (error) {
        setMessage(error.message);
    } else if (paymentIntent) {
        switch (paymentIntent.status) {
            case 'succeeded':
                setMessage('Payment succeeded!');
                break;
            case 'requires_payment_method':
                setMessage('Your payment was not successful, please try again.');
                break;
            default:
                setMessage('Something went wrong.');
                break;
        }
    }

    setIsLoading(false);
};

  return (
    <section className="bg-light py-5">
    <form id="payment-form" onSubmit={handleSubmit}>
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
