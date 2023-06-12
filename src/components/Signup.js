import { useState } from "react";
import { useUserActions } from "../hooks/api";

function Signup() {
  const { signup } = useUserActions();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, pwd, nombre, username, bio);
  };

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
          name="pwd"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </label>
      <label>
        Nombre:
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          name="nombre"
        />
      </label>
      <label>
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
        />
      </label>
      <label>
        Biografia:
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          name="bio"
        />
      </label>
      <button>Registrarse</button>
    </form>
  );
}

export default Signup;
