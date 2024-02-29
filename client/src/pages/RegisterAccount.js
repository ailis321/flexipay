import React, { useEffect, useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import FeatureSections from '../components/FeatureSections';

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
      <header className="text-center py-4">
        <h1>Register Your Account</h1>
      </header>
      <div className="container mt-5 mb-5"> 
        <SignUpForm />
     
        <FeatureSections features={features} />
      </div>
    </div>
  );
};

export default RegisterAccount;

