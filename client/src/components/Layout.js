import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  
  const showHeaderAndFooter = !location.pathname.startsWith("/pay/");

  return (
    <>
      {showHeaderAndFooter && <Header />}
      {children}

    </>
  );
};

export default Layout;
