//this page is the account profile page
//it will display the account details and preferences
//it will also allow the user to update their preferences
//user can also change their password here

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, CircularProgress, Button } from '@mui/material';
import useGetProfileInfo from '../hooks/useGetProfileInfo';
import useGetAccountPreferences from '../hooks/useGetAccountPreferences';
import AccountInfo from '../components/AccountInfo';
import Preferences from '../components/Preferences';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';  

const AccountPage = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useAuthenticationContext();  

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    const token = user ? user.token : null;

    const { profileInfo, loading: loadingProfile, error: errorProfile } = useGetProfileInfo(token);
    const { preferences, loading: loadingPreferences, error: errorPreferences, preferencesFound } = useGetAccountPreferences(token);

    useEffect(() => {
        if (errorProfile) {
            alert(errorProfile);
        }
        if (errorPreferences) {
            alert(errorPreferences);
        }
    }, [errorProfile, errorPreferences]);

    if (loadingProfile || loadingPreferences) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!profileInfo) {
        return <Typography variant="h6" textAlign="center">Unable to load account details.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Box my={4} display="flex" flexDirection="column" alignItems="center">
                <AccountInfo profileInfo={profileInfo} token={token} logo={preferences?.logo} />
                {preferences ? (
                    <Preferences preferences={preferences} />
                ) : (
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body1">
                            You have not completed your preferences yet.
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => navigate(`/preferences?onboardingComplete=true`)}
                        > Update Now </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default AccountPage;
