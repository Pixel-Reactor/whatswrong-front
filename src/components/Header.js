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
     

      <article>
        <Menu />
        <Minimenu />
      </article>
    </div>
  );
};

export default Header;
