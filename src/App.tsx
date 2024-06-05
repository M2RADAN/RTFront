import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from "./components/auth/login/LoginComponent";
import { Register } from "./components/auth/register/RegisterComponent";
import "./App.css";
import Mapgl from "./components/map/mapComponent";
import { RouteInfoComponent } from "./components/RouteInfo/RouteInfoComponent";

function App() {
  return (
    <Router>
      <div>
        {/* <div className="card">
        <RouteInfoComponent />
      </div> */}
        {/* <div className="card">
        <Mapgl />
      </div> */}
        <nav>
          <div>не зареган</div>
          <ul>
            <li>
              <Link to="/">дефолт</Link>
            </li>
            <li>
              <Link to="/login">Войти</Link>
            </li>
            <li>
              <Link to="/register">Зарегестрироваться</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Mapgl />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
