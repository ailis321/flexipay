import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useRetrieveClients from '../hooks/useRetrieveClients';
import CustomerList from '../components/CustomerList';
import AddMoreCustomers from '../components/AddMoreCustomers'; 

const ViewCustomers = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const token = user.token;
  const navigate = useNavigate();
  const { clients, isLoading, error, retrieveClients } = useRetrieveClients();

  useEffect(() => {
    if (user && retrieveClients) {
      retrieveClients(token);
    }
  }, [user, retrieveClients, token]);

  const handleAddCustomers = () => {
    navigate('/createCustomer'); // Redirect to the create customer page
  };

  return (
    <div className="home">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {clients.length > 0 ? (
            <>
              <CustomerList customers={clients} fetchCustomers={() => retrieveClients(token)} />
              <AddMoreCustomers onAddMoreCustomersClick={handleAddCustomers} />
            </>
          ) : (
            <div>
              <p>You have not added any customers yet.</p>
              <button onClick={handleAddCustomers}>Click here to update your customer directory</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewCustomers;
