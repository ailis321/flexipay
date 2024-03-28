import React, { useState, useEffect } from 'react';

const PaymentLink = ({ token }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(''); 
  const [customers, setCustomers] = useState([]);
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/clients/get-customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
    const email = selectedCustomer ? selectedCustomer.email : '';

    try {
      const response = await fetch('/api/payment/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          description,
          customerId: selectedCustomerId,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment link');
      }

      const responseData = await response.json();
      setPaymentLink(responseData.paymentLink);
    } catch (error) {
      console.error('Error creating payment link:', error);
    }
  };

  return (
    <div className="content-wrapper" style={{ marginBottom: '200px' }}>
      <div className="container my-5">
        <h2>Create Payment Link</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="customerId">Customer</label>
            <select
              id="customerId"
              className="form-control"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              required
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {`${customer.name} (${customer.email})`}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Generate Payment Link</button>
        </form>
        {paymentLink && (
          <div className="alert alert-success mt-3">
            Payment Link: <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentLink;
