// shows list of customers 
// allows user to add more customers as well at the bottom of the page
// can also edit customer details here which will update in DB and stripe
// can delete customers here which will delete from DB and stripe
// option to view a customers specific profile from here too 

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRetrieveClients from '../hooks/useRetrieveClients';
import CustomerList from '../components/CustomerList';
import AddMoreCustomers from '../components/AddMoreCustomers'; 
import SearchBar from '../components/SearchBar';
import { Container, Grid, Typography, Button } from '@mui/material';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';

const ViewCustomers = () => {

  const navigate = useNavigate();
  const { user, dispatch } = useAuthenticationContext();  

  useEffect(() => {
    if (!user) {
        navigate('/login');
    } else {
        retrieveClients(user.token);
    }
}, [navigate, user]);

const token = user ? user.token : null;

  const { clients, isLoading, error, retrieveClients } = useRetrieveClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  

  useEffect(() => {
    const results = clients.filter(client =>
      client.name && client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    console.log("search results: ", results);
}, [clients, searchTerm]); 


  const handleAddCustomers = () => {
    navigate('/create-customer'); 
  };

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ mt: 4, mb: 2 }} >
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} label={'Search By Customer Name..'} />
            </Grid>
          </Grid>
          {clients.length > 0 ? (
            <>
              <CustomerList customers={searchResults} fetchCustomers={() => retrieveClients(token)} />
              <AddMoreCustomers onAddMoreCustomersClick={handleAddCustomers} />
            </>
          ) : (
            <div>
              <Typography>You have not added any customers yet.</Typography>
              <Button onClick={handleAddCustomers} variant="contained">Click here to add your first customer</Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ViewCustomers;