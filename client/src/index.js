import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {AuthenticationContextProvider} from './context/AuthenticationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthenticationContextProvider>
    <App />
    </AuthenticationContextProvider>
  </React.StrictMode>
);

