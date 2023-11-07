import React, { useState } from "react";
import s from "./style.module.scss";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isRegisterIn, setIsRegisterIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/register", data)
      .then(() => {
        setIsRegisterIn(true);
      })
      .catch((err) => alert("There was an error", err));
  };

  if (isRegisterIn) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          id="ln"
          placeholder="lastname"
          value={data.lastname}
          onChange={handleChange}
        />
      </div>
      <div className={s.sep}>
        <label className={s.color} htmlFor="email">
          Email Address
        </label>
        <input
          className={s.input}
          type="email"
          name="email"
          id="em"
          placeholder="example_name@example.com"
          autoComplete="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className={s.color} htmlFor="password">
          Password
        </label>
        <input
          className={s.input}
          type="password"
          name="password"
          id="pswd"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className={s.btn} type="submit">
          Register
        </button>
      </div>
      <div>
        <p>
          If you have an account, click <Link to="/login">here</Link>
        </p>
      </div>
    </form>
  );
}
