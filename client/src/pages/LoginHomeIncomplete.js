//this page is rendered if the customer tries to login but the onboarding process with stripe is not complete
//the customer is then redirected to the onboardingUrl to complete the process
//the stripeAccountId is passed as a query parameter to the onboardingUrl

import React from 'react';
import { useLocation } from 'react-router-dom';
import TaglineComponent from '../components/Tagline';

const LoginHomeIncomplete = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const onboardingUrl = queryParams.get('onboardingUrl');
  const stripeAccountId = queryParams.get('account');


  return (
    <div className="Home">
      <TaglineComponent
        title={`Hello ${stripeAccountId}, We need some more information from you!`}
        description="FlexiPay works in partnership with Stripe Payment Gateway. This ensures your payments are secure and protected. To finish your Stripe account set-up follow this link"
        buttonText="Complete Now"
        buttonLink={onboardingUrl}
        imageUrl="https://freeagent-res.cloudinary.com/image/upload/c_limit,w_1200/dpr_auto,f_auto/website-images/netlify/Stripe-blog-June-23.png"
      />
  
    </div>
  );
};

export default LoginHomeIncomplete;