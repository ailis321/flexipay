import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, 
  FormHelperText, Checkbox, FormControlLabel, FormGroup, Box, ListItemIcon, ListItemText, Tooltip, IconButton, 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Alert from '@mui/material/Alert';
import useStorePreferences from '../hooks/useStorePreferences';
import InputAdornment from '@mui/material/InputAdornment';
import { useLocation } from 'react-router-dom';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';



function PreferenceSetupPage() {
    const location = useLocation();
    const navigate = useNavigate();
  const { user, dispatch } = useAuthenticationContext();  

  useEffect(() => {
      if (!user) {
          navigate('/login');
  
      }
  }, [navigate, user]);

  const token = user ? user.token : null;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const onboardingComplete = queryParams.get('onboardingComplete');

        if (onboardingComplete === 'true') {
            console.log('Onboarding complete');
            const user = JSON.parse(localStorage.getItem('user')) || {};

            // Update the onboardingComplete property
            user.onboardingComplete = true;
            
            // Save the updated user object back to local storage
            localStorage.setItem('user', JSON.stringify(user));
          
        } 
    }, [location, navigate]);

    const { isSaving, error, storePreferences } = useStorePreferences(token);
    const [colourScheme, setColourScheme] = useState('#c4e9e8');
    const [success, setSuccess] = useState('');
    const [logoURL, setLogo] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessContactNumber, setBusinessContactNumber] = useState('');
    const [businessEmailAddress, setBusinessEmailAddress] = useState('');
    const [organisationType, setOrganisationType] = useState('');
    const [paymentTypes, setPaymentTypes] = useState({
      donations: false,
      membershipFees: false,
      expenses: false,
      other: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // A basic check to see if all the text fields have a value and at least one payment type is checked
        const isEveryFieldFilled = colourScheme && logoURL && customMessage && businessContactNumber && businessEmailAddress && businessName && organisationType;
        const isOnePaymentTypeChecked = Object.values(paymentTypes).some(Boolean);
    
        setIsFormValid(isEveryFieldFilled && isOnePaymentTypeChecked);
      }, [colourScheme, logoURL, customMessage, businessContactNumber, businessEmailAddress, businessName, organisationType, paymentTypes]);


  
    const handlePaymentTypeChange = (event) => {
      setPaymentTypes({ ...paymentTypes, [event.target.name]: event.target.checked });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!isFormValid) {
       
        alert("Please fill in all fields and select at least one payment type.");
        return;
      }

      const preferences = {
        colourScheme,
        customMessage,
        businessName,
        organisationType,
        paymentTypes: Object.keys(paymentTypes).filter(key => paymentTypes[key]),
        logoURL,
        businessContactNumber,
        businessEmailAddress,
      };

      const result = await storePreferences(preferences); 

      if (!error && result) {
        setSuccess('Preferences saved successfully!');

        setTimeout(() => {
          navigate('/how-it-works'); 
        }, 2000); 
      }

    };
      
    

    return (
        <section className="bg-light py-5">
          <Container maxWidth="sm" sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Customise Your Payment Experience
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
              Personalise the payment links sent to your customers with your organisation's branding and a unique message.
            </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
        <FormControl variant="filled" sx={{ flex: 1 }}>
        <InputLabel id="colour-scheme-label">Colour Scheme</InputLabel>
        <Select
          labelId="colour-scheme-label"
          id="colour-scheme"
          value={colourScheme}
          onChange={(e) => 
            setColourScheme(e.target.value)}
          renderValue={(value) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, backgroundColor: value, marginRight: 8 }}></div>
              {value}
            </div>
          )}
          fullWidth
        >
          <MenuItem value="#1792e8">
            <ListItemIcon sx={{ backgroundColor: '#1792e8', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Sky Blue" />
          </MenuItem>
          <MenuItem value="#0f3d07">
            <ListItemIcon sx={{ backgroundColor: '#0f3d07', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Dark Green" />
          </MenuItem>
          <MenuItem value="#679892">
            <ListItemIcon sx={{ backgroundColor: '#679892', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Turquoise" />
          </MenuItem>
          <MenuItem value="#767174">
            <ListItemIcon sx={{ backgroundColor: '#767174', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Grey" />
          </MenuItem>
          <MenuItem value="#27d86f">
            <ListItemIcon sx={{ backgroundColor: '#27d86f', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Green" />
          </MenuItem>
          <MenuItem value="#e5e751">
            <ListItemIcon sx={{ backgroundColor: '#e5e751', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Yellow" />
          </MenuItem>
          <MenuItem value="#edb412">
            <ListItemIcon sx={{ backgroundColor: '#edb412', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Orange" />
          </MenuItem>
          <MenuItem value="#ed9d85">
            <ListItemIcon sx={{ backgroundColor: '#ed9d85', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Coral" />
          </MenuItem>
          <MenuItem value="#6a483a">
            <ListItemIcon sx={{ backgroundColor: '#6a483a', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Brown" />
          </MenuItem>
          <MenuItem value="#f4a5c9">
            <ListItemIcon sx={{ backgroundColor: '#f4a5c9', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Pink" />
          </MenuItem>
          <MenuItem value="#ee2611">
            <ListItemIcon sx={{ backgroundColor: '#ee2611', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Red" />
            </MenuItem>
          <MenuItem value="#9a92f4">
            <ListItemIcon sx={{ backgroundColor: '#9a92f4', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Purple" />
            </MenuItem>
            <MenuItem value="#2e2ff8">
            <ListItemIcon sx={{ backgroundColor: '#2e2ff8', minWidth: 20, minHeight: 20 }} />
            <ListItemText primary="Royal Blue" />
            </MenuItem>
          </Select>
        <FormHelperText>Select a colour theme for your brand</FormHelperText>
      </FormControl>

      <FormControl variant="filled" sx={{ flex: 1 }}>
        <InputLabel id="organisation-type-label">Type of Organisation</InputLabel>
        <Select
          labelId="organisation-type-label"
          id="organisation-type-select"
          value={organisationType}
          onChange={(e) => setOrganisationType(e.target.value)}
          fullWidth
        >
          <MenuItem value="charity">Charity</MenuItem>
          <MenuItem value="nonProfitOrganisation">Non-profit Organisation</MenuItem>
          <MenuItem value="school">School</MenuItem>
          <MenuItem value="socialClub">Social Club</MenuItem>
          <MenuItem value="sportsClub">Sports Club</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        <FormHelperText>Select the type of your organisation</FormHelperText>
      </FormControl>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
        Type of Payments to Receive
      </Typography>

      <FormGroup sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={paymentTypes.donations} onChange={handlePaymentTypeChange} name="donations" />}
          label="Donations"
        />
        <FormControlLabel
          control={<Checkbox checked={paymentTypes.membershipFees} onChange={handlePaymentTypeChange} name="membershipFees" />}
          label="Payment of Membership Fees"
        />
        <FormControlLabel
          control={<Checkbox checked={paymentTypes.expenses} onChange={handlePaymentTypeChange} name="expenses" />}
          label="Expenses"
        />
        <FormControlLabel
          control={<Checkbox checked={paymentTypes.other} onChange={handlePaymentTypeChange} name="other" />}
          label="Other"
        />
      </FormGroup>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
     <TextField
        label="Your Company Logo URL"
        value={logoURL}
        onChange={(e) => setLogo(e.target.value)}
        variant="filled"
        fullWidth
        sx={{ my: 2 }}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Enter a valid URL to an image that represents your company's logo.">
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

      <TextField
        label="Custom Message for Payment Link"
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        variant="filled"
        fullWidth
        sx={{ my: 2 }}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Enter a short thank you message which will be displayed under payment details">
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
      />
      <TextField
        label="Displayed Business Contact Number"
        value={businessContactNumber}
        onChange={(e) => setBusinessContactNumber(e.target.value)}
        variant="filled"
        fullWidth
        sx={{ my: 2 }}
      />
          <TextField
        label="Displayed Business Email Address"
        value={businessEmailAddress}
        onChange={(e) => setBusinessEmailAddress(e.target.value)}
        variant="filled"
        fullWidth
        sx={{ my: 2 }}
      />
          <TextField
        label="Displayed Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        variant="filled"
        fullWidth
        sx={{ my: 2 }}
      />
        </Box>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
         <Button
      variant="contained"
      style={{ backgroundColor: '#53937d' }}
      onClick={handleSubmit}
      disabled={!isFormValid} // Disable the button if the form is not valid
      sx={{ mt: 2, alignSelf: 'center' }}
    >
      {isSaving ? 'Saving...' : 'Save Preferences'}
    </Button>
    </Container>
    </section>
  );
}

export default PreferenceSetupPage;