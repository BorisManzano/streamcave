import React, { useEffect } from "react";
import Login from "../Login";
import { Route, Routes, useNavigate } from "react-router";
import Register from "../Register";
import Home from "../Home";
import NavBar_home from "../Navbar_start";
import Dashboard from "../Dashboard";
import axios from "axios";
import { login } from "../../state/user";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = location;

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/me", {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data) {
          dispatch(login(result.data));
        }
      })
      .catch((err) => {
        if (pathname === "/dashboard") {
          navigate("/");
          return <p>para ver mas contenido debes logearte</p>;
        }
      });
  }, []);

  useEffect(() => {
    if (user.email && pathname === "/login") {
      navigate("/dashboard");
    }
    if (user.email && pathname === "/register") {
      navigate("/dashboard");
    }
    if (user.email && pathname === "/") {
      navigate("/dashboard");
    }
  }, [user, pathname]);

  return (
    <div className="App">
      <NavBar_home />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
