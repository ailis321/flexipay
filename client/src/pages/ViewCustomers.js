import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRetrieveClients from '../hooks/useRetrieveClients';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import CustomerList from '../components/CustomerList';

const ViewCustomers = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticationContext();
  const { clients, isLoading, error, retrieveClients } = useRetrieveClients();

  useEffect(() => {
    // Only retrieve clients if user is available and retrieveClients function is ready
    if (user && retrieveClients) {
      retrieveClients(user.token);
    }
  }, [user, retrieveClients]); // Only run effect when user or retrieveClients changes

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
