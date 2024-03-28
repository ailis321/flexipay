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
              {customers.map(customer => (
                <tr key={customer.id} style={{ height: '60px' }}>
                  <td>
                    <input 
                      type="checkbox" 
                      value={customer.id} 
                      onChange={() => handleCheckboxChange(customer.id)} 
                      checked={selectedCustomers.includes(customer.id)}
                    />
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedCustomers.length > 0 && (
          <div className="mt-3 d-flex justify-content-center gap-2"> 
            <button className="btn btn-sm" onClick={handleEdit} style={{ backgroundColor: '#53937d', color: 'white' }}>Edit</button> 
            <button className="btn btn-sm" onClick={handleDelete} style={{ backgroundColor: '#53937d', color: 'white' }}>Delete</button>
            <button className="btn btn-sm" onClick={() => setSelectedCustomers([])} style={{ backgroundColor: '#53937d', color: 'white' }}>Clear Selection</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomersList;
