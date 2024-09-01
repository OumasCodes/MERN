import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import "./NavLinks";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">My Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">New Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Login</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
