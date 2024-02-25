// RegisterAccount.js
import React from 'react';
import SignUpForm from '../components/SignUpForm';
import FeatureSections from '../components/FeatureSections';

const RegisterAccount = () => {
  return (
    <div>
      <header className="text-center py-4">
        <h1>Register Your Account</h1>
      </header>
      <div className="container mt-5 mb-5"> {/* Add bottom margin */}
        <SignUpForm />
        <FeatureSections />
      </div>
    </div>
  );
};

export default RegisterAccount;
