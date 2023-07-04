import { useEffect, useState } from "react";
import {
  GetUser,
  ModifyUser,
  GetColaboraciones,
  ModifyUserPwd,
} from "../Api/Api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Colaboraciones } from "./Colaboraciones";
import ServiceCard from "./ServiceCard";
import CommentCard from "./CommentCard";

const Bio = () => {
  const navigate = useNavigate();
  const { user, LogOut, imgLink } = useUser();
  const [colaboraciones1, setColaboraciones1] = useState();
  const [colaboraciones2, setColaboraciones2] = useState();
  const [activitysel, setactivitysel] = useState("services");
  const [bio, setBio] = useState({});
  const [mod, setMod] = useState(false);
  const [modData, setModData] = useState(false);
  const [modUserOrPwd, setModUserOrPwd] = useState(false);
  const [nombre, setNombre] = useState();
  const [username, setUsername] = useState();
  const [bioText, setBioText] = useState();
  const [file, setFile] = useState();
  const [oldPwd, setOldPwd] = useState();
  const [newPwd, setNewPwd] = useState();

  useEffect(() => {
    const colaboraciones = async () => {
      // console.log(user);

      try {
        const res = await GetColaboraciones(user.token);
        // console.log(res);

        if (res?.statusText === "OK") {
          setColaboraciones1(res.data.data1);
          setColaboraciones2(res.data.data2);
        }

        // console.log(bio);
      } catch (error) {
        console.log(error);
      }
    };

    colaboraciones();
    const getUser = async () => {
      // console.log(user.token);

      try {
        const res = await GetUser(user.token);
        if (res?.statusText === "OK") {
          setBio(res?.data.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    // console.log(user);
  }, [user]);

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("nombre", nombre || bio.nombre);
      formdata.append("username", username || bio.username);
      formdata.append("biografia", bioText || bio.biografia);
      formdata.append("avatar", file || bio.avatar);

      await ModifyUser(formdata, user.token);
      LogOut();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPwd = async (e) => {
    e.preventDefault();
    try {
      const pwds = { pwdVieja: oldPwd, pwdNueva: newPwd };
      await ModifyUserPwd(pwds, user.token);
      LogOut();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bio_section">
      <article className="margin-bottom-20">
        {!mod && (
          <article className="bio_det_box">
            {imgLink(user.avatar)}

            <div className="bio_det flex-column-evenly">
              <h2>{bio.nombre}</h2>
              <p>{bio.username}</p>

              <p>{bio.biografia}</p>
            </div>
          </article>
        )}
        {mod && modUserOrPwd && (
          <form
            onSubmit={handleSubmitUser}
            className="bio_form flex-column-evenly"
          >
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              minLength="4"
              maxLength="50"
              required
            />
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              minLength="3"
              maxLength="25"
            />
            <textarea
              name="bio"
              id="bio"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              placeholder="Biografia..."
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit" className="button-8">
              Enviar
            </button>
          </form>
        )}
        {mod && !modUserOrPwd && (
          <form
            onSubmit={handleSubmitPwd}
            className="bio_form flex-column-evenly"
          >
            <input
              type="password"
              name="oldPwd"
              id="oldPwd"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              placeholder="Contrasena vieja"
              minLength="4"
              maxLength="25"
            />
            <input
              type="password"
              name="newPwd"
              id="newPwd"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="Nueva contrasena (min: 4)"
              minLength="4"
              maxLength="25"
            />

            <button type="submit" className="button-8">
              Enviar
            </button>
          </form>
        )}

        <button
          className="button-8"
          onClick={() => {
            setMod(!mod);
            setModData(!modData);
            modUserOrPwd && mod && setModUserOrPwd(!modUserOrPwd);
          }}
        >
          {mod ? "Cancelar" : "Modificar password"}
        </button>
        {!modData && (
          <button
            className="button-8"
            onClick={() => {
              setMod(!mod);
              setModData(!modData);
              setModUserOrPwd(!modUserOrPwd);
            }}
          >
            {mod ? "" : "Modifiar usuario"}
          </button>
        )}
      </article>

      <article className=" padding-10">
        <h3>Actividad</h3>
      </article>

      <section className="order_box  flex-center-left">
        <article className="order_select flex-center-center ">
          <div
            className={activitysel === "services" ? "select" : ""}
            onClick={() => setactivitysel("services")}
          >
            Servicios
          </div>
          <div
            className={activitysel === "comments" ? "select" : ""}
            onClick={() => setactivitysel("comments")}
          >
            Comentarios
          </div>
        </article>
      </section>
      {activitysel === "services" ? (
        <article className="activity flex-column-top-right">
          {colaboraciones1?.map((item) => (
            <ServiceCard key={item.idservicios} data={item} />
          )) ?? "loading"}
        </article>
      ) : (
        <article className="activity">
          <ul className="services_ul  flex-column-center">
            {colaboraciones2 ? (
              colaboraciones2.map((comm) => (
                <CommentCard key={comm.idcomentarios} data={comm} />
              ))
            ) : (
              <div className="button-4 text-center ">
                <p>No se han encontrado comentarios</p>
              </div>
            )}
          </ul>
        </article>
      )}
    </section>
  );
};

export default Bio;
