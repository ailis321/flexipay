
import React, { createContext, useReducer, useEffect } from 'react';
import { decodeJwt } from '../utils/authUtils';  

export const AuthenticationContext = createContext();

export const authenticationReducer = (state, action) => {
  switch (action.type) {
      case 'LOGIN':
          return { user: action.payload };  
      case 'LOGOUT':
          localStorage.removeItem('user');  
          return { user: null }; 
      default:
          return state; 
  }
};


export const AuthenticationContextProvider = ({ children }) => {
  console.log("AuthenticationContextProvider is running");
    const [state, dispatch] = useReducer(authenticationReducer, { user: null });

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log("User loaded from local storage:", user);
  
      if (user && user.token) {
          const decodedToken = decodeJwt(user.token);
          const currentTime = Date.now() / 1000;
  
          if (decodedToken && decodedToken.exp < currentTime) {
              console.log('Token has expired');
              dispatch({ type: 'LOGOUT' });
          } else if (decodedToken) {
              dispatch({ type: 'LOGIN', payload: user });
              const timeout = (decodedToken.exp - currentTime) * 1000;
            
              const timer = setTimeout(() => {
                  console.log('Logging out due to token expiry');
                  dispatch({ type: 'LOGOUT' });
              }, timeout);
              return () => {
                  clearTimeout(timer);
                  console.log('Cleanup: Timer cleared');
              };
          }
      }
  }, []);
  
console.log("State in AuthenticationContextProvider:", state);

    return (
        <AuthenticationContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
