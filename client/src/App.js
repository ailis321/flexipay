import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthenticationContext } from "./hooks/useAuthenticationContext";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import Home from "./pages/Home";
import ViewCustomers from "./pages/ViewCustomers";
import RegisterAccount from "./pages/RegisterAccount";
import Footer from "./components/Footer";
import LoginHomeIncomplete from "./pages/LoginHomeIncomplete";
import Login from "./pages/LoginPage";
import PaymentLinkPage from "./pages/PaymentLinkPage";
import PaymentTakePage from "./pages/PaymentTakePage";
import Layout from "./components/Layout";
import PaymentSuccess from "./components/PaymentSuccess";
import Dashboard from "./pages/Dashboard";
import PaymentIntentsDashboard from "./pages/PaymentIntentsDashboard";
import PaymentsInAndOut from "./pages/PaymentsInAndOut";
import CustomerActivityPage from "./pages/CustomerActivityPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import CurrentMonthDashboard from "./pages/CurrentMonthDashboard";
import YearEndDashboard from "./pages/YearEndDashboard";
import AccountPage from "./pages/AccountPage";
import HowItWorks from "./pages/HowItWorks";
import PreferenceSetupPage from "./pages/PreferenceSetupPage";
import CustomStatementDashboard from "./pages/CustomStatementDashboard";

function App() {

  const { user } = useAuthenticationContext();

  console.log('user:', user);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/view-customers" element={user ? <ViewCustomers/> : <Navigate to="/login" />} />
            <Route path="/create-customer" element={<CreateCustomerPage />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <RegisterAccount /> : <Navigate to="/dashboard" />} />
            <Route path="/moreInfo" element={<LoginHomeIncomplete />} />
            <Route path="/payment-link" element={user ? <PaymentLinkPage /> : <Navigate to="/login" />} />
            <Route path="/pay/:paymentIntentId" element={<PaymentTakePage />} />
            <Route path="/pay/success" element={<PaymentSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/current-month" element={<CurrentMonthDashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/year-end" element={<YearEndDashboard />} />
            <Route path="/account" element={<AccountPage /> } />
            <Route path="/preferences" element={<PreferenceSetupPage />} />
            <Route path="/custom-statement" element={<CustomStatementDashboard />} />
            <Route path="/customer-activity" element={<CustomerActivityPage />} />
            <Route path="/customer-profile/:customerId" element={<CustomerProfilePage />} />
            <Route path="/paymentIntents" element={<PaymentIntentsDashboard />} />
            <Route path="/view-payments" element={ <PaymentsInAndOut />} />
            <Route path="/home" element= {!user ? <Home /> : <Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  );
}

export default App;
