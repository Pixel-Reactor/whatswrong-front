import React, { useEffect, useState } from "react";
import { AddLike, GetLikesServices, GetService, SendComment } from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ReactComponent as Corazon } from "../images/corazon.svg";
import { Corazon1 } from "../hooks/useHandleCorazon";

const Service = () => {
  const { user } = useUser();
  const [servicedet, setServicedet] = useState();
  const [owner, setOwner] = useState();
  const [coments, setComents] = useState();
  const { id } = useParams();
  const [comentarioText, setComentarioText] = useState();
  const navigate = useNavigate();
  const [likePulsado, setLikePulsado] = useState("");
  const [numLikesServices, setNumLikesServices] = useState();

  const Fecha = (fecha) => {
    const date = new Date(fecha);
    const now = new Date();
    const difference = Math.abs(date - now);
    const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return `hace ${diffDays - 1} ${diffDays - 1 === 1 ? "dia" : "dias"}`;
    } else {
      return `hoy`;
    }
  };

  useEffect(() => {
    const service = async () => {
      try {
        const response = await GetService(id);
        const res = await GetLikesServices(id);
        // console.log(response.data.dataService[0].fichero);
        // console.log(response.data.dataService);
        // console.log(response.data.dataComents);
        // console.log(res.data.data);
        setNumLikesServices(res.data.data.length);
        // console.log(user);
        const encontrar = res.data.data.find((e) => e.users_id === user.id);
        // console.log(encontrar);

        if (encontrar) {
          setLikePulsado(encontrar.idlikes);
        }

        if (response.statusText === "OK") {
          setServicedet(response.data.dataService[0]);
          // console.log(servicedet)
          setOwner(response.data.owner[0]);
          // console.log(owner)
          setComents(response.data.dataComents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    service();
  }, [comentarioText, likePulsado]);

  // console.log(oneService);
  // console.log(coments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SendComment(
        {
          comment: comentarioText,
          service_id: id,
        },
        user.token
      );
      setComentarioText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setComentarioText(e.target.value);
  };

  const handleLike = async (e) => {
    // const corazonDiv = e.target.parentElement;
    try {
      if (likePulsado > 0) {
        await AddLike(
          {
            servicios_id: servicedet.idservicios,
            idLikes: likePulsado,
          },
          user.token
        );
        setLikePulsado("");
      } else {
        const res = await AddLike(
          {
            servicios_id: servicedet.idservicios,
          },
          user.token
        );
        setLikePulsado(res.data.insertId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="services flex-column-center-top">
      <div className="flex-column-center-top service_box">
        <div className="flex-center-center">
          {owner?.avatar ? (
            <img
              className="bio_img"
              src={`http://localhost:4000/img/link/${owner.avatar}`}
              alt="avatar"
              width={"20px"}
            />
          ) : (
            <img
              className="bio_img"
              src={require("../images/default_avatar.png")}
              alt="avatar"
              width={"20px"}
            />
          )}
          <p>
            <b className="margin-5">{owner?.username ?? ""}</b>
          </p>
          <p className="margin-5">pregunta : </p>{" "}
        </div>
        <div className="service_card_det flex-center-right">
          <p className="button-small-green flex-center-center">
            {servicedet?.finalizado ? "cerrado" : "abierto"}{" "}
          </p>
        </div>
        <div className="margin-5">
          <h2 className="card_title">{servicedet?.titulo ?? "loading"}</h2>
        </div>
        <div className="margin-y-10-x-5">
          <p>{servicedet?.descripcion ?? "loading"}</p>
        </div>
        {servicedet?.fichero ? (
          <div className="question_img_box">
            <img
              src={`http://localhost:4000/img/link/${
                JSON.parse(servicedet.fichero).name
              }`}
              width={"100%"}
              alt=""
            />
          </div>
        ) : (
          " "
        )}
        <div className="boton_like" onClick={handleLike}>
          <Corazon className={likePulsado > 0 ? "rojo" : ""} />
          <span>{numLikesServices} likes</span>
        </div>
        <div className="service_card_owner flex-column-left">
          <div className="flex-center-between">
            <div>
              <p> {servicedet?.create_at ? Fecha(servicedet.create_at) : ""}</p>
            </div>
          </div>
        </div>
      </div>
      {user.token ? (
        <form onSubmit={handleSubmit} className="service_form">
          <textarea
            name="comentario"
            id="comentario"
            cols="50"
            rows="5"
            placeholder="Comentario..."
            value={comentarioText}
            onChange={handleChange}
          ></textarea>
          <button>Enviar</button>
        </form>
      ) : (
        <div className="not_comment">
          <p>Registrate o accede para poder hacer un commentario</p>
        </div>
      )}

      <ul className="services_ul flex-column-center">
        {coments
          ?.sort((a, b) => b.idcomentarios - a.idcomentarios)
          .map((el) => (
            <li key={el.idcomentarios} className="services_li">
              <p>{el.comentario}</p>
              <span>
                {" "}
                {`Autor: ${el.users_id} ${new Date(
                  el.create_at
                ).toLocaleDateString()} `}
              </span>
              <div>
                <Corazon1 comentarios_id={el.idcomentarios} />
              </div>
            </li>
          )) ?? "Servicio no encontrado"}
      </ul>
    </div>
  );
};

export default Service;
