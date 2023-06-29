import { useEffect, useState } from "react";
import { GetUser, ModifyUser, GetColaboraciones } from "../Api/Api";
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
  const [activitysel, setactivitysel] = useState('services');
  const [bio, setBio] = useState({});
  const [mod, setMod] = useState(false);
  const [nombre, setNombre] = useState();
  const [username, setUsername] = useState();
  const [bioText, setBioText] = useState();
  const [file, setFile] = useState();


  useEffect(() => {
    const colaboraciones = async () => {
      // console.log(user);

      try {
        const res = await GetColaboraciones(user.token);
        console.log(res);

        if (res?.statusText === "OK") {
          setColaboraciones1(res.data.data1);
          setColaboraciones2(res.data.data2);
        }
      } catch (error) {
        console.log(error);
      }
    };

    colaboraciones();
    const getUser = async () => {
      console.log(user.token)

      try {
        const res = await GetUser(user.token);
        console.log(res)
        if (res?.statusText === "OK") {
          setBio(res?.data.data[0]);


        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [user]);

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
        <button className="button-8" onClick={() => setMod(!mod)}>
          {mod ? "Cancelar" : "Modifiar usuario"}
        </button>
        <button className="button-8" onClick={() => setMod(!mod)}>
          {mod ? "" : "Modificar password"}
        </button>
      </article>

      <article className=" padding-10"><h3>Actividad</h3></article>

      <section className="order_box  flex-center-left">

        <article className="order_select flex-center-center ">
          <div className={activitysel === 'services' ? 'select' : ''} onClick={() => setactivitysel('services')}>Servicios</div>
          <div className={activitysel === 'comments' ? 'select' : ''} onClick={() => setactivitysel('comments')}>Comentarios</div>

        </ article >
      </section>
      {activitysel === 'services' ? <article className="activity flex-column-top-right">

        {colaboraciones1?.map(item =>
          <ServiceCard key={item.idservicios} data={item} />)
          ?? 'loading'}


      </article> : 
     <article className="activity"> 
     <ul className="services_ul  flex-column-center">
     {colaboraciones2 ? colaboraciones2.map(comm => 
     <CommentCard key={comm.idcomentarios} data={comm} />) : <div className="button-4 text-center ">
       <p>No se han encontrado comentarios</p>
     </div>}
   </ul></article>
}

    </section>
  );
};

export default Bio;
