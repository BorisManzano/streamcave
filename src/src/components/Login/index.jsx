import React, { useEffect } from "react";
import s from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/user";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", data, {
        withCredentials: true,
      })
      .then((result) => {
        dispatch(login(result.data));
        navigate("/dashboard");
      })
      .catch((err) => alert("There was an error", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className={s.sep}>
        <label htmlFor="email">Email Address</label>
        <input
          className={s.input}
          type="email"
          name="email"
          id="email"
          placeholder="example_name@example.com"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className={s.input}
          type="password"
          name="password"
          id="pswd"
          placeholder="password"
          autoComplete="current-password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className={s.btn} type="submit">
          Login
        </button>
      </div>
      <div>
        <p>
          or create a new account <Link to={"/register"}>{"here"}</Link>
        </p>
      </div>
    </form>
  );
}
