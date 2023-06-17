import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Minimenu from "./Minimenu";
import logo from "../images/logo.png";
const Header = () => {
  const { user } = useUser();
  // console.log(user.username);
  return (
    <div className="header">
      <article className="logo flex-center-center">
        <img src={logo} alt="logo"></img>
      </article>
      <article className="nav flex-center-center">
        <ul className="flex-center-center">
          <li className="margin-5">Home</li>
          <li className="margin-5">Servicios</li>
          <li className="margin-5">Algo</li>
        </ul>
      </article>

      <article>
        <Menu />
        <Minimenu />
      </article>
    </div>
  );
};

export default Header;
