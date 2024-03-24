import React, { useState } from 'react';

const CustomersList = ({ customers }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  
  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers(prevSelectedCustomers => {
      if (prevSelectedCustomers.includes(customerId)) {
        return prevSelectedCustomers.filter(id => id !== customerId);
      } else {
        return [...prevSelectedCustomers, customerId];
      }
    });
  };

  const handleEdit = () => {
   //NEED TO ADD IN EDIT FUNCTIONALITY
    console.log("Edit selected:", selectedCustomers);
  };

  const handleDelete = () => {
//SAME FOR DELETE
    console.log("Delete selected:", selectedCustomers);
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 style={{ color: '#53937d' }}>Customer Directory</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover" style={{ backgroundColor: "rgba(83, 147, 125, 0.8)", color: 'white' }}>
            <thead>
              <tr style={{ fontSize: '1.2rem' }}>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.map(customer => (
                <tr key={customer.id} style={{ height: '60px' }}>
                  <td>
                    <input 
                      type="checkbox" 
                      value={customer.id} 
                      onChange={() => handleCheckboxChange(customer.id)} 
                      checked={selectedCustomers.includes(customer.id)}
                    />
                  </td>
                  <td style={{ color: '#53937d' }}>{customer.name}</td>
                  <td style={{ color: '#53937d' }}>{customer.email}</td>
                  <td style={{ color: '#53937d' }}>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedCustomers.length > 0 && (
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleEdit} style={{ backgroundColor: '#53937d' }}>Edit</button>
            <button className="btn btn-danger me-2" onClick={handleDelete} style={{ backgroundColor: '#53937d' }}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setSelectedCustomers([])} style={{ backgroundColor: '#53937d' }}>Clear Selection</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomersList;
