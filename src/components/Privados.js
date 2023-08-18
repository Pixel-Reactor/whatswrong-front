import { useEffect, useState } from "react";
import { GetUserById, PrivadosGet, PrivadosPost } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";

export const Privados = () => {
  const { id } = useParams();
  const { user, setnotification, fileLink } = useUser();
  const [mensajesPrivados, setMensajesPrivados] = useState();
  const [mensaje, setMensaje] = useState();
  const [user1, setUser1] = useState();
  const [user2, setUser2] = useState();

  useEffect(() => {
    const privadosMsj = async () => {
      try {
        const res = await PrivadosGet(id, user.token);
        if (res?.statusText === "OK") {
          const resSort = res.data.data;
          const resSort1 = resSort.sort(
            (a, b) => b.idmensajes_privados - a.idmensajes_privados
          );
          setMensajesPrivados(resSort1);
          //   console.log(res);
          //   console.log(mensajesPrivados);
        }

        const res1 = await GetUserById(id);
        if (res1?.statusText === "OK") {
          //   console.log(res1);
          setUser1(res1.data.data[0]);
        }

        const res2 = await GetUserById(user.id);
        if (res2?.statusText === "OK") {
          //   console.log(res2);
          setUser2(res2.data.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(() => {
      privadosMsj();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hola");
    try {
      const raw = { mensaje: mensaje, toUser: id, ownerid: user.id };
      const res = await PrivadosPost(raw, user.token);
      if (res?.statusText === "OK") {
        setMensaje("");
        //   console.log(res);
        //   console.log(mensajesPrivados);
      }
    } catch (error) {
      setnotification(`${error.response.data.message}`);
      console.log(error.response.data.message);
    }
  };

  return (
    <section className="chat_section">
      {user1 && (
        <p>
          <span>Mensajes privados con:</span>
          {fileLink(user1.avatar)}
          <span className="chat_touser">{user1.username}</span>
        </p>
      )}
      <article>
        <ul className="chat_ul">
          {mensajesPrivados
            ? mensajesPrivados?.map((msj) => {
                return (
                  <li
                    key={msj.idmensajes_privados}
                    className={
                      user.id === msj.owner_id ? "derecha" : "izquierda"
                    }
                  >
                    {user.id === msj.owner_id
                      ? fileLink(user2?.avatar)
                      : fileLink(user1?.avatar)}
                    <p>{msj.mensaje}</p>
                  </li>
                );
              })
            : "No hay mensajes"}
        </ul>
      </article>
      <article>
        <form onSubmit={handleSubmit} className="chat_form">
          <input
            placeholder="envia un mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button className="button-fancy-blue">Enviar</button>
        </form>
      </article>
    </section>
  );
};
