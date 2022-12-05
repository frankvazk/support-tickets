import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const distpach = useDispatch();
  const onLogout = () => {
    distpach(logout());
    distpach(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">Support Desk</NavLink>
      </div>
      <ul>
        {auth.user !== null && (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignInAlt />
              Logout
            </button>
          </li>
        )}
        {!auth?.user && (
          <>
            <li>
              <NavLink to="/login">
                <FaSignInAlt />
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <FaUser />
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
