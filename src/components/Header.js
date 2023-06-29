import React from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import {  IconSearch } from "@tabler/icons-react";
import Menu from "./Menu";
import Minimenu from "./Minimenu";
import logo from "../images/logo.png";
import logosmall from '../images/solution.png'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <article className="logo-small flex-center-center" onClick={()=>navigate('/')}>
        <img src={logosmall} alt="logo" ></img>
      </article>
      <article className="logo flex-center-center" onClick={()=>navigate('/')}>
        <img src={logo} alt="logo"></img>
      </article>


      <article className="search-bar-container flex-center-center">
        <div className="search-bar-small flex-center-center">
          <IconSearch width={'20px'} strokeWidth={'1'} />
        </div>
        <div className="search-bar-box flex-center-center">
          <div className="search-bar-icon flex-center-center">
            <IconSearch width={'20px'} strokeWidth={'1'} />
          </div>
          <input type="text" name="search" placeholder="Buscar" />
        </div>

      </article>

      <article>
        <Menu />
        <Minimenu />
      </article>
    </div>
  );
};

export default Header;
