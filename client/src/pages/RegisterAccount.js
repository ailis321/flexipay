// register account page to sign up for a new account
// will redirect to the onboarding page to complete the stripe account setup
// no need for user or token checks here

import React, { useEffect, useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import FeatureSections from '../components/FeatureSections';
import StripePartnerSection from '../components/StripePartnerSection';

const RegisterAccount = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('/api/features');
        if (!response.ok) {
          throw new Error('Failed to fetch features');
        }
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);
  return (
    <div>
      <header className="text-center py-5 bg-light" style={{ color: '#53937d' }}>
        <h1>
          FlexiPay is Powered by Stripe
          <img
            src="https://www.svgrepo.com/show/331592/stripe-v2.svg"
            alt="Stripe Logo"
            style={{ width: '60px', height: 'auto', marginLeft: '10px' }}
          />
        </h1>
      </header>
      <StripePartnerSection />
      <header className="text-center py-5">
        <h1>Register Your Account</h1>
      </header>
      <div className="container mt-5 mb-5">
        <SignUpForm />
      </div>
      <FeatureSections features={features} />
    </div>
  );
};


export default RegisterAccount;

