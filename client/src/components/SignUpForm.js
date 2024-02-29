import React, { useState } from 'react';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Prepare data to send to backend for Stripe account creation
    const formData = {
      firstName,
      lastName,
      businessName,
      email,
      password
      // Add other necessary fields for Stripe account creation
    };
    // Make a POST request to your backend to create a Stripe Connect account
    try {
      const response = await fetch('/api/accounts/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to create account');
      }
      // Account created successfully, handle the response
      const data = await response.json();
      console.log('Account created:', data);
      // Redirect the user to the account link URL received from the backend
      window.location.href = data.accountLink; // Redirect the user to the account link URL
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
      <div className="col-md-5"> 
          <img src="https://www.projectcounter.org/wp-content/uploads/2016/03/icon-register.png" className="img-fluid pl-3" alt="Illustration" /> {/* Added padding to the left of the image */}
        </div>
        <div className="col-md-7">
          <h2 className="mb-4">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Choose a Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Get Started</button>
          </form>
          <p className="mt-3 text-center">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
