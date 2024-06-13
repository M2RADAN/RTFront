import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/login/Login";
import { Register } from "./components/auth/register/Register";
import "./App.css";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import Info from "./components/Info/Info";
import Edit from "./components/edit/Edit";
import List from "./components/list/List";
import { AuthLayout } from "./layouts/AuthLayout";
import UnAuthLayout from "./layouts/UnAuthLayout";

function App() {
  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="profile" element={<Profile />} />
            <Route
              path="login"
              element={
                <UnAuthLayout>
                  <Login />
                </UnAuthLayout>
              }
            />
            <Route
              path="register"
              element={
                <UnAuthLayout>
                  <Register />
                </UnAuthLayout>
              }
            />
            <Route path="edit" element={<Edit />} />
            <Route path="info" element={<Info />} />
            <Route path="list" element={<List />} />
          </Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}
export default App;
