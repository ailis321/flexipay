// App.js
import { useAuthenticationContext } from "./hooks/useAuthenticationContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  // this is null if they are not logged in and an object if they are
  //using this to conditionally render certain pages to screen
  const { user } = useAuthenticationContext();
  console.log('user:', user);
 
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
          <Route path="/view-customers" element={<ViewCustomers />} />
          <Route path="/createCustomer" element={<CreateCustomerPage/> } />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <RegisterAccount /> : <Navigate to="/dashboard" />} />
          <Route path="/moreInfo" element={<LoginHomeIncomplete />} />
          <Route path="/paymentLink" element={<PaymentLinkPage />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/yourAccount" element={user ? <LoginHomeComplete /> : <Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
