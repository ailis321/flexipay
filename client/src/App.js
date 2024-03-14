// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import RegisterAccount from "./pages/RegisterAccount";
import Footer from "./components/Footer";
import LoginHomeIncomplete from "./pages/LoginHomeIncomplete";
import LoginHomeComplete from "./pages/LoginHomeComplete";
import Login from "./pages/LoginPage";
import CreateCustomerForm from "./components/CreateCustomerForm";
import { useAuthenticationContext } from "./hooks/useAuthenticationContext";
import DashboardPage from "./pages/DashboardPage";

function App() {
  // this is null if they are not logged in and an object if they are
  //using this to conditionally render certain pages to screen
  const { user } = useAuthenticationContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <RegisterAccount /> : <Navigate to="/dashboard" />} />
          <Route path="/moreInfo" element={<LoginHomeIncomplete />} />
           <Route path="/createCustomer" element={<CreateCustomerForm />} />
           <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/yourAccount" element={user ? <LoginHomeComplete /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
