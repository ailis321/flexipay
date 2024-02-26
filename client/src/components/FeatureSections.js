import React from 'react';

const FeatureSections = ({ features }) => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row">
          {features.map(feature => (
            <div key={feature._id} className="col-md-3">
              <div className="text-center">
                <img src={feature.icon} alt={feature.title} className="mb-3" style={{ width: '80px' }} />
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSections;
