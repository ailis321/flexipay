import React, { useState, useEffect } from 'react';

const PaymentLink = ({ token }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState({id: '', email: ''}); 
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers(token);
  }, [token]);

  const fetchCustomers = async (token) => {
    try {
      const response = await fetch('/api/clients/get-customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}` 
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/payment/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount,
          description,
          customerId: selectedCustomer.id,
          email: selectedCustomer.email, 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment link');
      }

      // Handle success response
      const responseData = await response.json();
      console.log('Payment link created:', responseData.paymentLink);

    } catch (error) {
      console.error('Error creating payment link:', error);
    }
  };

  return (
    <div className="content-wrapper" style={{ marginBottom: '200px' }}>
      <div className="container my-5">
        <h2>Create Payment Link</h2>
        <form id="paymentForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="customerId">Customer:</label>
            <select id="customerId" name="customerId" className="form-control" 
              value={JSON.stringify(selectedCustomer)} 
              onChange={(e) => setSelectedCustomer(JSON.parse(e.target.value))} required>
              <option value={JSON.stringify({id: '', email: ''})}>Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={JSON.stringify({id: customer.id, email: customer.email})}>
                  {`${customer.name} (${customer.email})`}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Generate Payment Link</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentLink;
