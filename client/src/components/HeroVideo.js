import React from 'react';

const HeroVideo = () => {
  return (
    <div className="hero-video">
   <video autoPlay loop muted className="hero-video__video">
   <source src={process.env.PUBLIC_URL + "/dogVid.mp4"} type="video/mp4" />
  Your browser does not support the video tag.
</video>
      <div className="hero-video__content">
        <h1 className="hero-video__title">Accepting Payments made easier</h1>
        <p className="hero-video__description">Explore our services and products</p>
        <button className="hero-video__button">Learn More</button>
      </div>
    </div>
  );
};

export default HeroVideo;
