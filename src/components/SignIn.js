import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserActions } from "../hooks/api";
import { useUser } from "../context/UserContext";

const SignIn = () => {
  const [user] = useUser();
  const { login } = useUserActions();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, pwd);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </label>
      <label>
        Contraseña:
        <input
          name="password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </label>
      <button>Entrar</button>
    </form>
  );
};

export default SignIn;
