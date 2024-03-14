import React, { createContext, useReducer, useEffect } from 'react';

// Create the authentication context
export const AuthenticationContext = createContext();

export const authenticationReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                //...state is the spread operator, it takes the current state and copies it into the new stateS
                ...state,
                isAuthenticated: true,
                user: action.payload,
                
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}

export const AuthenticationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authenticationReducer, {
        user: null,
    });

    // will fire once rendered to screen
    useEffect(() => {
        //attempting to get user from local storage
        const user = localStorage.getItem('user');

        //if it is found then dispatch a login action 
        if (user) {
            dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
        }
    }, []);

    console.log('Authentication State', state);

    return (
        <AuthenticationContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
