import { useState } from "react";
import { NewUser } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";

function Signup() {
  const navigate = useNavigate();
  const {setsrcon}= useUser();
  const [newuser, setnewuser] = useState({
    email: "",
    pwd: "",
    nombre: "",
    username: "",
    biografia: "..."
    
  });
  const [errmsg, seterrmsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await NewUser(newuser);
      if (response.data.status === "ok") {
        Swal.fire("Listo!", `${response.data.message}`, "success");
        // console.log(response)
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      seterrmsg(error.response.data.message);
      // console.log()
    }
  };
  const HandleChange = (e) => {
    setnewuser({
      ...newuser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="signup-section" onClick={()=>setsrcon(false)}>
      <h1>Registrate</h1>
      <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-item">
          <input
            onChange={HandleChange}
            name="nombre"
            autoComplete="off"
            required
          />
          <label htmlFor="nombre">Nombre</label>
        </div>

        <div className="form-item">
          <input
            onChange={HandleChange}
            name="username"
            autoComplete="off"
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-item">
          <input
            onChange={HandleChange}
            name="email"
            autoComplete="off"
            required
          />
          <label htmlFor="email">Correo</label>
        </div>

        <div className="form-item">
          <input
            name="pwd"
            type="password"
            onChange={HandleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="pwd">Contraseña</label>
        </div>


        <div className="form-item">
          <textarea
            placeholder="Biografia"
            onChange={HandleChange}
            name="biografia"
            autoComplete="off"
          />
        </div>

        <button className="button-4-big">Registrarse</button>
      </form>
      {errmsg ? <div className="error-mod">{errmsg}</div> : ""}
    </section>
  );
}

export default Signup;
