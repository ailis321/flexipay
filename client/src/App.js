// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import RegisterAccount from "./pages/RegisterAccount";
import Footer from "./components/Footer";

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
          </Routes>
        </div>
        <Footer /> {/* Include the Footer component outside the Routes element */}
      </BrowserRouter>
    </div>
  );
}

export default App;
