import { useEffect, useState } from "react";
import { GetUser, ModifyUser } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Bio = () => {
  const navigate = useNavigate();
  const { user, LogOut } = useUser();
  const [bio, setBio] = useState({});
  const [mod, setMod] = useState(false);
  const [nombre, setNombre] = useState();
  const [username, setUsername] = useState();
  const [bioText, setBioText] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    const getUser = async () => {
      // console.log(user);

      try {
        const res = await GetUser(user.token);
        // console.log(res);
        // console.log(bio.avatar)

        if (res.statusText === "OK") {
          setBio(res.data.data[0]);
        }
        // console.log(bio);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("nombre", nombre);
      formdata.append("username", username);
      formdata.append("biografia", bioText);
      formdata.append("avatar", file);

      await ModifyUser(formdata, user.token);
      LogOut();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bio_section">
      {/* <p>{bio.response.data?.message}</p> */}
      {!mod && (
        <article className="bio_det_box">
          <div>
            <img
              src={`http://localhost:4000/files/avatar/${bio.avatar}`}
              alt="avatar"
            />
          </div>
          <div className="bio_det flex-column-evenly">
            <h2>{bio.nombre}</h2>
            <p>{bio.username}</p>

            <p>{bio.biografia}</p>
          </div>
        </article>
      )}
      {mod && (
        <form onSubmit={handleSubmit} className="bio_form flex-column-evenly">
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <textarea
            name="bio"
            id="bio"
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Biografia..."
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Enviar</button>
        </form>
      )}
      {/* FALTA IMPLEMENTAR DES LOGUEO PORQUE CAMBIA DATOS Y EL TOKEN YA NO VALE */}
      <button onClick={() => setMod(!mod)}>
        {mod ? "Cancelar" : "Modifiar usuario"}
      </button>
      <button onClick={() => setMod(!mod)}>
        {mod ? "" : "Modifiar password"}
      </button>
    </section>
  );
};

export default Bio;
