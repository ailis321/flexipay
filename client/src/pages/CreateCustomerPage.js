// user can add customers on this page
// will need to provide a name, email and phone number
// this will add a customer to this business/user stripe account and on the datsbase
// gives an option to add more customers once one is added or to view all customers

import React from "react";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { UseAutocompleteParameters } from "@mui/material";
import CreateCustomerForm from "../components/CreateCustomerForm";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

const CreateCustomerPage = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthenticationContext();  

  useEffect(() => {
      if (!user) {
          navigate('/login');
      }
  }, [navigate, user]);

  const token = user ? user.token : null;


    return (
      <div className="CreateCustomerPage">
      <CreateCustomerForm />
      </div>
  
    );
};

export default CreateCustomerPage;
  