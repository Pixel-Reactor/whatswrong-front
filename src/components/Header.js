import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useUserActions } from "../hooks/api";

const Header = () => {
  const [user, logOut] = useUser();

  return (
    <div className="header">
      <span>{user?.username ?? ''}</span>
      <Link to="/">Home</Link>
      <nav className="header_nav">

        {!user ? <Link to="/signin">Login</Link> : ''}
        {!user ? <Link to="/signup">Registrate</Link> : ''}
        <Link to="/signin" onClick={logOut()} >
          Log Out
        </Link>
      </nav>
    </div>
  );
};

export default Header;
