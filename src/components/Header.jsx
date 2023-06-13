import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useUser } from "../context/UserContext";
import { useUserActions } from "../hooks/api";

const Header = () => {
  const [user,logOut] = useUser();

  return (
    <div className="header">
      <span>{user?.username ?? ''}</span>
      <nav className="header_nav">
        <Link to="/">Portada</Link>
       {!user ?   <Link to="/signin">Login</Link> : ''}
       {!user ? <Link to="/signup">Registrate</Link> : ''} 
        <Link to="/signin" onClick={logOut()} >
          Log Out
        </Link>
      </nav>
    </div>
  );
};

export default Header;
