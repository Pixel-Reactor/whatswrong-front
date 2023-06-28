import React from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { IconHome2, IconQuestionMark, IconSearch } from "@tabler/icons-react";
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
      <article className="nav flex-center-center">
        <ul className="flex-center-evenly">
          <li className="margin-5 flex-center-center">
            <Link to={"/"}>
              <IconHome2 size={25} strokeWidth={2} color={"rgb(100, 97, 97)"} />
              Home
            </Link>
          </li>

          <li className="margin-5 flex-center-center">
            <IconQuestionMark
              size={25}
              strokeWidth={2}
              color={"rgb(100, 97, 97)"}
            />
            Preguntas
          </li>
          <li className="margin-5 flex-center-center">
            <IconSearch size={25} strokeWidth={2} color={"rgb(100, 97, 97)"} />
            Buscar
          </li>
        </ul>
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
