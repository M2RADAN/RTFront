import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Mapgl />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}
export default App;
