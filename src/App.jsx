import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar.jsx"; 
import Home from "./Components/Home.jsx";
import Signin from "./Components/Signin.jsx";
import Signup from "./Components/Signup.jsx";
import Dashboard from "./Components/DashBoard.jsx";
import EditPersona from "./Components/EditPersona.jsx";
 function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editpersona/:index" element={<EditPersona />} />
      </Routes>
    </Router>
  );
}
export default App;
