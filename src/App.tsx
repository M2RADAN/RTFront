import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import "./App.css";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import Info from "./components/Info/Info";
import Edit from "./components/edit/Edit";
import List from "./components/list/List";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="edit" element={<Edit />} />
            <Route path="info" element={<Info />} />
            <Route path="list" element={<List />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
