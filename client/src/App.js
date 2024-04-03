import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthenticationContext } from "./hooks/useAuthenticationContext";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import Home from "./pages/Home";
import Header from "./components/Header";
import ViewCustomers from "./pages/ViewCustomers";
import RegisterAccount from "./pages/RegisterAccount";
import Footer from "./components/Footer";
import LoginHomeIncomplete from "./pages/LoginHomeIncomplete";
import LoginHomeComplete from "./pages/LoginHomeComplete";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentLinkPage from "./pages/PaymentLinkPage";
import PaymentTakePage from "./pages/PaymentTakePage";
import Layout from "./components/Layout";
import PaymentSuccess from "./components/PaymentSuccess";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user } = useAuthenticationContext();

  console.log('user:', user);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/view-customers" element={user ? <ViewCustomers/> : <Navigate to="/login" />} />
            <Route path="/createCustomer" element={<CreateCustomerPage />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <RegisterAccount /> : <Navigate to="/dashboard" />} />
            <Route path="/moreInfo" element={<LoginHomeIncomplete />} />
            <Route path="/paymentLink" element={user ? <PaymentLinkPage /> : <Navigate to="/login" />} />
            <Route path="/pay/:paymentIntentId" element={<PaymentTakePage />} />
            <Route path="/pay/success" element={<PaymentSuccess />} />
            <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/dashboard2" element={<Dashboard />} />
            <Route path="/yourAccount" element={user ? <LoginHomeComplete /> : <Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Layout>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
