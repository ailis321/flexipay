import React, { createContext, useReducer, useEffect } from 'react';

export const AuthenticationContext = createContext();

export const authenticationReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { user: action.payload }
      case 'LOGOUT':
        return { user: null }
      default:
        return state
    }
  }
  

export const AuthenticationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authenticationReducer, {
        user: null,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])
    
      console.log('Authentication Context state:', state)

    return (
        <AuthenticationContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
