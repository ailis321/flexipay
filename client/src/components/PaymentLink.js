import React, { useState, useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';
import { Button, Box } from '@mui/material';

const PaymentLink = ({ token }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(''); 
  const [customers, setCustomers] = useState([]);
  const [paymentLink, setPaymentLink] = useState('');
   const [isShareSupported, setIsShareSupported] = useState(false);

   useEffect(() => {
    // Check if the Web Share API is supported on this browser
    // it is is, set the state to true so that share option will be available to send via other options like text
    //otherwise copy and email options will still be available
    setIsShareSupported(!!navigator.share);
  }, []);


  useEffect(() => {
    if (!token) {
      return;
    }

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

  if (!token) {
    return null;
  }

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


  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink).then(() => {
      alert('Payment link copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Your Payment Link");
    const body = encodeURIComponent(`Here is your payment link: ${paymentLink}`);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Payment Link',
        text: 'Here is your payment link:',
        url: paymentLink,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      console.error('Web Share API is not supported in this browser.');
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
    <>
      <div className="alert alert-success mt-3">
        Payment Link: <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
      </div>
      <Box display="flex" justifyContent="space-between" mt={2} sx={{ gap: 1 }}>
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={handleCopyLink}>
          Copy Link
        </Button>
        <Button variant="contained" startIcon={<EmailIcon />} onClick={handleSendEmail}>
          Send via Email
        </Button>
           {/* Conditionally render the share button if the API is supported */}
         {isShareSupported && (
            <Button variant="contained" startIcon={<ShareIcon />} onClick={handleShare}>
            Share
            </Button>
          )}
      </Box>
    </>

      )}
    </div>
    </div>
  );
};

export default PaymentLink;