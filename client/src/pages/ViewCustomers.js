import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useRetrieveClients from '../hooks/useRetrieveClients';
import CustomerList from '../components/CustomerList';

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

  return (
    <div className="home">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <CustomerList customers={clients} fetchCustomers={() => retrieveClients(token)} />
      )}
    </div>
  );
};

export default ViewCustomers;
