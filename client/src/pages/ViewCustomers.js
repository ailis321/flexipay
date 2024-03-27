import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRetrieveClients from '../hooks/useRetrieveClients';
import { useMemo } from 'react';
import CustomerList from '../components/CustomerList';

const ViewCustomers = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  console.log('user paymnt link page :', user);
  const token = user.token;
  console.log('token:', token);
  const { clients, isLoading, error, retrieveClients } = useRetrieveClients();

  useEffect(() => {
    // Only retrieve clients if user is available and retrieveClients function is ready
    if (user && retrieveClients) {
      retrieveClients(token);
    }
  }, [retrieveClients]); // Only run effect when user or retrieveClients changes

  return (
    <div className="home">
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <CustomerList customers={clients} />
        )}
      </div>
    </div>
  );
}

export default ViewCustomers;
