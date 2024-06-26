// home page when user has not yet registered. 
// gives user the option to register or login
// will provide info about how flexipay works 
// includes FAQs and a carousel of reviews from other users

import React, { useEffect, useState } from 'react';
import Tagline from '../components/Tagline';
import FeatureSections from '../components/FeatureSections'; 
import FAQSection from '../components/FAQSection';
import Carousel from '../components/ReviewsCarousel';

import HeroVideo from '../components/HeroVideo';

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
  
      <Tagline 
        title="Accept Payments Online" 
        description="Simple and secure payment solutions for organisations. Get started today!" 
        buttonText="Sign Up" 
        buttonLink="http://localhost:3000/register" 
        imageUrl="https://qph.cf2.quoracdn.net/main-qimg-367cac9f2514e421d6f90cabd770c18d" 
      />
     <HeroVideo />
      <FeatureSections features={features} />
      <FAQSection /> 
      <Carousel />
    </div>
  );
};

export default Home;
