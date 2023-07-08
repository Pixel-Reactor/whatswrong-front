import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Login } from "../Api/Api";
import mailimg from "../images/mail.png";
import passimg from "../images/password.png";

const SignIn = () => {
  const { user, setUser, seterrmsg, setsrcon } = useUser();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await Login(data);
      // console.log(res);

      if (res.data.status === "ok") {
        console.log("ok");
        setUser({
          username: res.data.username,
          token: res.data.token,
          id: res.data.id,
          avatar: res.data.avatar,
        });

        navigate("/");
      } else {
        console.log("else", res);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      if (error.response.data) {
        setError(error.response.data.message);
      } else {
        seterrmsg({
          on: true,
          message: "Error de conexión con el servidor :(",
        });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="signup-section" onClick={() => setsrcon(false)}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-item flex-center-center">
          <input
            onChange={handleChange}
            name="email"
            autoComplete="off"
            autoFocus
            required
          />
          <label htmlFor="email" className="flex-center-center">
            {" "}
            <img src={mailimg} alt="mail" width={"20px"} /> Correo
          </label>
        </div>

        <div className="form-item">
          <input
            name="pwd"
            type="password"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="email" className="flex-center-center">
            <img src={passimg} alt="mail" width={"20px"} /> Contraseña
          </label>
        </div>

        <button className="flex-center-center button-4-big">
          Entrar{loading && <div className="lds-dual-ring margin-5"></div>}
        </button>
        {error && <p className="error-mod">{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
