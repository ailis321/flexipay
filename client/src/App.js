// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
//import Login from "./components/Login";
import RegisterAccount from "./pages/RegisterAccount";
import Footer from "./components/Footer";
import LoginHomeIncomplete from "./pages/LoginHomeIncomplete";
import LoginHomeComplete from "./pages/LoginHomeComplete";
import Login from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterAccount />} />
            <Route path="/moreInfo" element={<LoginHomeIncomplete />} />
            <Route path="/yourAccount" element={<LoginHomeComplete/>} />
          </Routes>
        </div>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
