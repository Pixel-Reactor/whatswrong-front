import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useUser } from "../context/UserContext";
import { useUserActions } from "../hooks/api";

const Header = () => {
  const [user] = useUser();
  const { logout } = useUserActions();

  return (
    <div className="header">
      <span>{user?.usuario.username}</span>
      <nav className="header_nav">
        <Link to="/">Portada</Link>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Registrate</Link>
        <Link to="/signin" onClick={() => logout()}>
          Log Out
        </Link>
      </nav>
    </div>
  );
};

export default Header;
