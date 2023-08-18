import React, { useEffect, useState } from "react";
import { AddLike, GetLikesServices, GetService, SendComment } from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ReactComponent as Corazon } from "../images/corazon.svg";
import CommentCard from "./CommentCard";
import { MarkDone } from "../Api/Api";
import {
  IconFilePlus,
  IconPhoto,
  IconDotsVertical,
  IconTrash,
  IconCircleCheck,
  IconUser,
  IconBrandTelegram,
} from "@tabler/icons-react";

const Service = () => {
  const [servicedet, setServicedet] = useState();
  const [owner, setOwner] = useState();
  // console.log(servicedet.users_id);
  const [coments, setComents] = useState();
  const [file, setFile] = useState();
  const [optionsmenu, setoptionsmenu] = useState(false);
  const [fileupload, setfileupload] = useState(false);
  const { id } = useParams();
  const [comentarioText, setComentarioText] = useState();
  const navigate = useNavigate();
  const [likePulsado, setLikePulsado] = useState("");
  const [numLikesServices, setNumLikesServices] = useState();
  const {
    user,
    fileLink,
    imgLink,
    setnotification,
    setsrcon,
    refreshservice,
    setrefreshservice,
  } = useUser();

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

  const Done = async () => {
    const response = await MarkDone({ done: id }, user.token);

    if (response.data === "ok") {
      setrefreshservice(refreshservice + 1);
    }
  };
  const Delete = async () => {
    const response = await MarkDone({ delete: id }, user.token);
    if (response.data.ok) {
      setnotification("Servicio eliminado con exito!");
      navigate("/");
    }
  };

  useEffect(() => {
    const service = async () => {
      try {
        const response = await GetService(id);
        const res = await GetLikesServices(id);

        setNumLikesServices(res.data.data.length);
        const encontrar = res.data.data.find((e) => e.users_id === user.id);

        if (encontrar) {
          setLikePulsado(encontrar.idlikes);
        }

        if (response.statusText === "OK") {
          setServicedet(response.data.dataService[0]);
          setOwner(response.data.owner[0]);
          setComents(response.data.dataComents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    service();
  }, [likePulsado, refreshservice, id, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SendComment(
        {
          comment: comentarioText,
          service_id: id,
        },
        file,
        user.token
      );
      setComentarioText("");
      setrefreshservice(refreshservice + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setComentarioText(e.target.value);
  };

  const handleLike = async (e) => {
    if (user.token) {
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
    }
  };

  return (
    <main
      className="services flex-column-center-top"
      onClick={() => setsrcon(false)}
    >
      <section className="service_card flex-column-center-top">
        <div className="flex-column-center-top service_box">
          <div className="flex-center-between width-100">
            <div className="flex-center-center ">
              <div
                className="pointer"
                onClick={() => {
                  navigate(`/usuario/${servicedet.users_id}`);
                }}
              >
                {owner?.avatar ? imgLink(owner.avatar) : " "}
              </div>
              <p>
                <b
                  className="margin-5 pointer"
                  onClick={() => {
                    navigate(`/usuario/${servicedet.users_id}`);
                  }}
                >
                  {owner?.username ?? ""}
                </b>
              </p>
              <p className="margin-5">pregunta : </p>{" "}
            </div>
            <div className="service_card_det flex-center-right">
              {servicedet?.finalizado ? (
                <div className="button-8 flex-center-center nopointer">
                  <p>resuelto!</p>
                </div>
              ) : (
                <div className="button-8 nopointer">
                  <p>Abierto</p>
                </div>
              )}

              <div
                className="edit_dots flex-center-center margin-5 position-relative"
                onClick={() => {
                  optionsmenu ? setoptionsmenu(false) : setoptionsmenu(true);
                }}
              >
                <IconDotsVertical
                  width={"20px"}
                  bbox={"1px solid black"}
                  strokeWidth={"1"}
                  className="pointer"
                />
                <div>
                  {user.username && (
                    <ul
                      style={{ display: optionsmenu ? "flex" : "none" }}
                      className="mini-menu-options flex-column-center"
                    >
                      <li
                        className="flex-center-left button-4"
                        onClick={() => {
                          navigate(`/privados/${servicedet.users_id}`);
                        }}
                      >
                        <IconBrandTelegram />
                        <p>msj privado</p>
                      </li>
                      <li
                        className="flex-center-left button-4"
                        onClick={() => {
                          navigate(`/usuario/${servicedet.users_id}`);
                        }}
                      >
                        <IconUser />
                        <p>Ir a usuario</p>
                      </li>

                      {user?.username === owner?.username && (
                        <>
                          <li
                            className="flex-center-left button-4"
                            onClick={Done}
                          >
                            <IconCircleCheck />
                            <p>Resuelto</p>{" "}
                          </li>
                          <li
                            className="button-7 flex-center-left"
                            onClick={Delete}
                          >
                            <IconTrash />
                            <p> Borrar</p>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="margin-5">
            <h2 className="card_title">{servicedet?.titulo ?? "loading"}</h2>
          </div>
          <div className="margin-y-10-x-5">
            <p>{servicedet?.descripcion ?? "loading"}</p>
          </div>

          {servicedet?.fichero ? (
            <div className="service_file">{fileLink(servicedet.fichero)}</div>
          ) : (
            " "
          )}

          <article className="hashtags_service">
            <p>
              {servicedet?.hashtag1 === "undefined" ||
              servicedet?.hashtag1 === "null" ||
              servicedet?.hashtag1 === null
                ? ""
                : `#${servicedet?.hashtag1}`}
            </p>
            <p>
              {servicedet?.hashtag2 === "undefined" ||
              servicedet?.hashtag2 === "null" ||
              servicedet?.hashtag1 === null
                ? ""
                : `#${servicedet?.hashtag2}`}
            </p>
            <p>
              {servicedet?.hashtag3 === "undefined" ||
              servicedet?.hashtag3 === "null" ||
              servicedet?.hashtag1 === null
                ? ""
                : `#${servicedet?.hashtag3}`}
            </p>
            <p>
              {servicedet?.hashtag4 === "undefined" ||
              servicedet?.hashtag4 === "null" ||
              servicedet?.hashtag1 === null
                ? ""
                : `#${servicedet?.hashtag4}`}
            </p>
            <p>
              {servicedet?.hashtag5 === "undefined" ||
              servicedet?.hashtag5 === "null" ||
              servicedet?.hashtag1 === null
                ? ""
                : `#${servicedet?.hashtag5}`}
            </p>
          </article>
          <article className="width-100  flex-center-between">
            <div className="boton_like" onClick={handleLike}>
              <Corazon className={likePulsado > 0 ? "rojo" : ""} />
              <span>
                {numLikesServices} {numLikesServices === 1 ? " like" : " likes"}
              </span>
            </div>
            <p> {servicedet?.create_at ? Fecha(servicedet.create_at) : ""}</p>
          </article>
        </div>
      </section>
      <section className="width-100 ">
        {user.token ? (
          <form
            onSubmit={handleSubmit}
            className="border-radius service_form flex-column-center"
          >
            <p className="width-100 padding-10">Tu respuesta</p>
            <textarea
              name="comentario"
              id="comentario"
              cols="50"
              rows="5"
              placeholder="Escribe aqui tu respuesta"
              value={comentarioText}
              onChange={handleChange}
            ></textarea>
            <div className="width-100 flex-center-left padding-10">
              <div className="button-4 " onClick={() => setfileupload(true)}>
                <IconFilePlus /> <br /> file
              </div>

              <div className="button-4" onClick={() => setfileupload(true)}>
                {" "}
                <IconPhoto /> <br /> imagen
              </div>
            </div>
            {fileupload ? (
              <div className="width-100 padding-10 flex-center-between">
                <input
                  type="file"
                  value={!file ? "" : null}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  className="button-7 flex-center-center"
                  onClick={() => {
                    setFile("");
                    setfileupload(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              ""
            )}
            <button className="button-8 width-100">Enviar</button>
          </form>
        ) : (
          <div
            className="not_comment_box flex-center-center"
            onClick={() => navigate("/signin")}
          >
            <div className="button-4 ">
              <p>Registrate o accede para poder hacer un commentario</p>
            </div>
          </div>
        )}
      </section>

      <ul className="services_ul flex-column-center">
        {coments ? (
          coments.map((comm) => (
            <CommentCard
              key={comm.idcomentarios}
              data={comm}
              comdel={setrefreshservice}
              idServicios1={owner}
              servicedet={servicedet}
              siONo={true}
            />
          ))
        ) : (
          <div className="button-4 text-center ">
            <p> Se el primero en responder a esta pregunta!</p>
          </div>
        )}
      </ul>
    </main>
  );
};

export default Service;
