import React from 'react';

const PaymentGreeting = ({ customerName, companyName, amount, logoUrl }) => {
  return (
    <section className="bg-light py-5">
    <div className="card text-center p-4 my-4">
      <div className="card-body">
        <img src={logoUrl} alt="Company Logo" className="img-fluid mb-3" style={{maxWidth: '100px'}}/>
        <h2 className="card-title">Hello, {customerName}</h2>
        <p className="card-text">{companyName} has sent you a payment link for £{amount}. To make your one-off payment, please use the payment form below.</p>
        <p className="text-muted mt-4">Powered By FlexiPay & Stripe</p>
      </div>
    </div>
    </section>
  );
};

export default PaymentGreeting;
