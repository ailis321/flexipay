//shows a profile summary for user includin name, email, stripe account id and business name
// can change password here using a dialog box
// can also edit personal details

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetProfileInfo from '../hooks/useGetProfileInfo';
import { Container, Box, CircularProgress } from '@mui/material';
import AccountInfo from '../components/AccountInfo';

const AccountPage = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    React.useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [navigate, user]);
  
    const token = user ? user.token : null;
  
    const { profileInfo, loading, error } = useGetProfileInfo(token);

    useEffect(() => {
        if (error) {
            alert(error); 
        }
    }, [error]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!profileInfo) {
        return null; 
    }

    return (
        <Container maxWidth="md">
            <Box my={4} display="flex" flexDirection="column" alignItems="center">
                <AccountInfo profileInfo={profileInfo} token={token} />
            </Box>
        </Container>
    );
};

export default AccountPage;
