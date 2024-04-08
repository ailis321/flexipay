import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthenticationContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
      <div className="container">
      <Link className="navbar-brand" to="/">
          {user ? `Hello, ${user.email}` : "FlexiPay"}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {!user && (  
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
             )}
             {user && ( 
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
             )}
             {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/payment-link">
                Payment Links
              </Link>
            </li>
             )}
               {!user && (
              <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
             )}
        
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/view-customers">
                Customers
              </Link>
            </li>
             )}
                  {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/create-customer">
                Add Customer
              </Link>
            </li>
             )}
              {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/account">
                Account
              </Link>
            </li>
             )}
               {!user && (
              <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
             )}
            {user && (
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
