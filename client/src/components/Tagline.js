

import React from 'react';
import { Link } from 'react-router-dom';

const TaglineComponent = ({ title, description, buttonText, buttonLink, imageUrl }) => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>
        
            <Link to={buttonLink} className="btn btn-primary btn-lg">{buttonText}</Link>
          </div>
          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <img src={imageUrl} alt="Payment" className="img-fluid" style={{ maxHeight: '500px', width: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaglineComponent;
