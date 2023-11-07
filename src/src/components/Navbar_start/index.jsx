import React from "react";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/user";
import axios from "axios";

export default function NavBar_home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleButtonLogout = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logout());
        navigate("/");
        console.log("Usuario borrado ", user);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <nav>
      <div>
        <h1>StreamCave</h1>
      </div>
      <div className={s.links}>
        {!user.email ? (
          <>
            <div>
              <button
                className={s.btnLog}
                type="button"
                name="log"
                onClick={() => {
                  handleButtonClick("/login");
                }}
              >
                Login
              </button>
            </div>
            <div>
              <button
                className={s.btn}
                type="button"
                name="reg"
                onClick={() => {
                  handleButtonClick("/register");
                }}
              >
                Register
              </button>
            </div>
          </>
        ) : (
          <div>
            <button
              className={s.btn}
              type="button"
              name="logout"
              onClick={(e) => {
                handleButtonLogout(e);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
