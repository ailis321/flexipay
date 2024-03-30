import React, { useState } from 'react';
import useEditCustomer from '../hooks/useEditCustomer';
import useDeleteCustomer from '../hooks/useDeleteCustomer';

const CustomersList = ({ customers, fetchCustomers }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState({ id: '', firstName: '', lastName: '', email: '', phone: '' });
  const [modalMessage, setModalMessage] = useState('');

  const { editCustomer } = useEditCustomer();
  const { deleteCustomer } = useDeleteCustomer();

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers(prevSelectedCustomers => {
      if (prevSelectedCustomers.includes(customerId)) {
        return prevSelectedCustomers.filter(id => id !== customerId);
      } else {
        return [...prevSelectedCustomers, customerId];
      }
    });
  };

  const handleEditClick = () => {
    if (selectedCustomers.length === 1) {
      const customerToEdit = customers.find(customer => customer.id === selectedCustomers[0]);
      const [firstName, lastName] = customerToEdit.name.split(' ');
      setEditingCustomer({ ...customerToEdit, firstName, lastName });
      setShowModal(true);
    }
  };

  const handleSaveChanges = async () => {
    const updatedCustomer = {
      ...editingCustomer,
      name: `${editingCustomer.firstName} ${editingCustomer.lastName}`,
    };
    await editCustomer(editingCustomer.id, updatedCustomer);
    setModalMessage('Customer updated successfully!');
    setTimeout(() => {
      setShowModal(false);
      setModalMessage('');
      setSelectedCustomers([]);
      fetchCustomers();
    }, 2000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingCustomer(prev => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleDeleteClick = () => {
    selectedCustomers.forEach(customerId => deleteCustomer(customerId));
    setSelectedCustomers([]);
    fetchCustomers();
  };

  const renderEditModal = () => (
    <div style={{ display: showModal ? 'block' : 'none', position: 'fixed', zIndex: '1', left: '0', top: '0', width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div style={{ backgroundColor: '#fefefe', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%', maxWidth: '600px' }}>
        <span style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setShowModal(false)}>&times;</span>
        <h2>Edit Customer</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '10px' }}>
            <label>First Name:</label>
            <input type="text" value={editingCustomer.firstName} onChange={handleInputChange} name="firstName" required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Last Name:</label>
            <input type="text" value={editingCustomer.lastName} onChange={handleInputChange} name="lastName" required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input type="email" value={editingCustomer.email} onChange={handleInputChange} name="email" required pattern="\S+@\S+\.\S+" title="Please enter a valid email address" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Phone:</label>
            <input type="text" value={editingCustomer.phone} onChange={handleInputChange} name="phone" />
          </div>
          <button type="button" onClick={handleSaveChanges} disabled={!isValidEmail(editingCustomer.email)}>Save Changes</button>
        </form>
        {modalMessage && <div style={{ marginTop: '20px', color: 'green' }}>{modalMessage}</div>}
      </div>
    </div>
  );

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
                    <input type="checkbox" value={customer.id} onChange={() => handleCheckboxChange(customer.id)} checked={selectedCustomers.includes(customer.id)} />
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderEditModal()}
        {selectedCustomers.length > 0 && (
          <div className="mt-3 d-flex justify-content-center gap-2">
            <button className="btn btn-sm" onClick={handleEditClick} style={{ backgroundColor: '#53937d', color: 'white' }}>Edit</button>
            <button className="btn btn-sm" onClick={handleDeleteClick} style={{ backgroundColor: '#53937d', color: 'white' }}>Delete</button>
            <button className="btn btn-sm" onClick={() => setSelectedCustomers([])} style={{ backgroundColor: '#53937d', color: 'white' }}>Clear Selection</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomersList;
