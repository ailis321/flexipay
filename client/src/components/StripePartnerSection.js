import React from 'react';

const StripePartnerSection = () => {
  return (
    <section className="py-5 bg-light d-flex justify-content-center align-items-center min-vh-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center">
            <img
              src="https://www.cairnskangarooms.com/wp-content/uploads/2018/07/Stripe-Payment-Logo.png"
              alt="Stripe Logo"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <ul className="list-unstyled text-start">

                <li className="mb-3">Upon completing the registration with FlexiPay below, you'll proceed to finalise additional registration details with Stripe.</li>
                <li className="mb-3">This step ensures secure fund transfers to your organisation's account.</li>
                <li className="mb-3">Completing the Stripe registration is necessary to access FlexiPay services.</li>
                <li className="mb-3">Upon completion, you'll be redirected to your new FlexiPay account and Dashboard</li>
                <li className="mb-3">It's a free process and typically takes no longer than 5 minutes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StripePartnerSection;
