import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserActions } from "../hooks/api";
import { useUser } from "../context/UserContext";
import "./SignIn.css";

const SignIn = () => {
  const [user] = useUser();
  const { login } = useUserActions();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, pwd);
    setError(res.message);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className=" login">
      <label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </label>
      <label>
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </label>
      <button>Entrar</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;
