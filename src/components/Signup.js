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
    <form onSubmit={handleSubmit} className="signup">
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
          placeholder="Contraseña"
          name="pwd"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </label>
      <label>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          name="nombre"
        />
      </label>
      <label>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
        />
      </label>
      <label>
        <textarea
          placeholder="Biografia"
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
