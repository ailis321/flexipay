import React from 'react';

const AddMoreCustomers = ({ onAddMoreCustomersClick }) => {
  return (
    <div className="add-more-customers text-center my-4">
      <p>Would you like to add more customers?</p>
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <button onClick={onAddMoreCustomersClick} className="btn btn-success btn-sm"  style={{ backgroundColor: '#53937d', color: 'white' }}>
            Add More Customers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoreCustomers;
