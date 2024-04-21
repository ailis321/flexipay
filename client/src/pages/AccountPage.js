import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, CircularProgress, Button } from '@mui/material';
import useGetProfileInfo from '../hooks/useGetProfileInfo';
import useGetAccountPreferences from '../hooks/useGetAccountPreferences';
import AccountInfo from '../components/AccountInfo';
import Preferences from '../components/Preferences';

const AccountPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    // Redirect to login if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    const token = user ? user.token : null;

    // Retrieve profile information and preferences
    const { profileInfo, loading: loadingProfile, error: errorProfile } = useGetProfileInfo(token);
    const { preferences, loading: loadingPreferences, error: errorPreferences, preferencesFound } = useGetAccountPreferences(token);

    // Display errors from either profile info or preferences
    useEffect(() => {
        if (errorProfile) {
            alert(errorProfile);
        }
        if (errorPreferences) {
            alert(errorPreferences);
        }
    }, [errorProfile, errorPreferences]);

    // Check if loading either profile info or preferences
    if (loadingProfile || loadingPreferences) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                <CircularProgress />
            </Box>
        );
    }

    // Check if data is loaded
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