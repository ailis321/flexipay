import React, { useState } from 'react';
import { useSignupForm } from '../hooks/useSignUpForm';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {signupBackend, error, isLoading} = useSignupForm()

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted:', { firstName, lastName, businessName, email, password, confirmPassword });
    await signupBackend({ firstName, lastName, businessName, email, password, confirmPassword });

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
      <div className="col-md-5"> 
          <img src="https://www.projectcounter.org/wp-content/uploads/2016/03/icon-register.png" className="img-fluid pl-3" alt="Illustration" /> 
        </div>
        <div className="col-md-7">
  
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="First Name" 
              value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Last Name" 
              value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Business Name" 
              value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email Address" 
              value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Choose a Password" 
              value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Confirm Password" 
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100"disabled={isLoading}>Get Started</button>
            <div className="text-center mt-3">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
          </form>
          <p className="mt-3 text-center">By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
