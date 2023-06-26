import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Minimenu from "./Minimenu";
import logo from "../images/logo.png";
import { IconSearch} from '@tabler/icons-react';

const Header = () => {
  const { user } = useUser();
  // console.log(user.username);
  return (
    <div className="header">
      <article className="logo flex-center-center">
        <img src={logo} alt="logo"></img>
      </article>
     <article className="search-bar-box flex-center-center">
     <div className="search-bar-icon flex-center-center">
      <IconSearch width={'20px'}  strokeWidth={'1'} />
     </div>
     <input type="text" name="search" placeholder="Buscar"  />
     </article>
    
      <article>
        <Menu />
        <Minimenu />
      </article>
    </div>
  );
};

export default Header;
