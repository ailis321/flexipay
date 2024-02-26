import React, { useEffect, useState } from 'react';
import Tagline from '../components/Tagline';
import FeatureSections from '../components/FeatureSections'; 
import FAQSection from '../components/FAQSection';

const Home = () => {
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
    <div className="Home">
      <Tagline />
      {/* Pass features data as props to FeatureSections component */}
      <FeatureSections features={features} />
      <FAQSection /> {/* Include the FAQSection component */}
    </div>
  );
};

export default Home;
