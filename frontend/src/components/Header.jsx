import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">Support Desk</NavLink>
      </div>
      <ul>
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
      </ul>
    </header>
  );
};

export default Header;
