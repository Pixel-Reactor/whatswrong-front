import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

import { IconDotsVertical, IconTrash, IconStar } from "@tabler/icons-react";
import { AddLike, BestComent, GetLikesComents } from "../Api/Api";

import { ReactComponent as Corazon } from "../images/corazon.svg";

const CommentCard = (props) => {
  const { user, fileLink, imgLink } = useUser();
  const [optionsmenu, setoptionsmenu] = useState(false);

  const [comment, setComment] = useState(props.data);
  const [best, setBest] = useState("");
  // console.log(comment.servicios_id);

  const [refresh, setRefresh] = useState(0);

  const [disablebtn, setdisablebtn] = useState(false);
  const [likePulsado, setLikePulsado] = useState("");
  const [numLikesServices, setNumLikesServices] = useState();

  useEffect(() => {
    setComment(props.data);
  }, [refresh, props.data]);

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

  const handleLike = async (e) => {
    if (user.token) {
      setdisablebtn(true);
      try {
        if (likePulsado > 0) {
          await AddLike(
            {
              comentarios_id: comment.idcomentarios,

              idLikes: likePulsado,
            },
            user.token
          );
          setLikePulsado(false);
          setdisablebtn(false);
        } else {
          setdisablebtn(true);

          await AddLike(
            {
              comentarios_id: comment.idcomentarios,
              servicios_id: comment.servicios_id,
            },
            user.token
          );
          setLikePulsado(true);
          setdisablebtn(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBestComent = () => {
    try {
      optionsmenu ? setoptionsmenu(false) : setoptionsmenu(true);

      console.log(user.token);
      console.log(comment.idcomentarios);

      BestComent(comment.idcomentarios, user.token).then(setRefresh(1));
    } catch (error) {
      console.log(error);
    }
  };

  // const Delete = async () => {
  //   console.log("clicked");
  //   const res = await DeleteComment(
  //     { comm_id: comment.idcomentarios },
  //     user.token
  //   );
  //   console.log(res);
  //   res.data.ok
  //     ? setrefreshservice(refreshservice + 1)
  //     : setnotification("No ha sido posible eliminar");
  // };

  useEffect(() => {
    const service = async () => {
      if (comment) {
        try {
          const res = await GetLikesComents(comment.idcomentarios);
          // console.log(comment);

          if (comment.mejor_comentario === 1) {
            setBest("best");
          }

          setNumLikesServices(res.data.data.length);
          const encontrar = res.data.data.find((e) => e.users_id === user.id);

          if (encontrar) {
            setLikePulsado(encontrar.idlikes);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    service();
  }, [likePulsado, comment, user.id]);
  return (
    <article className={`service_card flex-column-center-top ${best}`}>
      <div className="flex-column-center-top service_box">
        <div className="flex-center-between width-100">
          <div className="flex-center-center">
            {comment?.avatar ? imgLink(comment.avatar) : ""}
            <p>
              <b className="margin-5">{comment?.owner ?? ""}</b>
            </p>
          </div>

          <div
            className="margin-5 position-relative"
            onClick={() => {
              optionsmenu ? setoptionsmenu(false) : setoptionsmenu(true);
              console.log(optionsmenu);
            }}
          >
            <IconDotsVertical width={"20px"} strokeWidth={"1"} />
            <div>
              <ul
                style={{ display: optionsmenu ? "flex" : "none" }}
                className="mini-menu-options flex-column-center"
              >
                <li
                  className="flex-center-left button-4"
                  onClick={handleBestComent}
                >
                  <IconStar />
                  <p>Mejor</p>
                  <p>comentario</p>
                </li>
                {user?.username === comment?.owner ? (
                  <>
                    <li className="button-7 flex-center-left">
                      <IconTrash />
                      <p> Borrar</p>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="margin-y-10-x-5">
          <p>{comment?.comentario ?? "loading"}</p>
        </div>
        {comment?.fichero_comentario ? (
          <div className="comment_img_box">
            {fileLink(comment.fichero_comentario)}
          </div>
        ) : (
          " "
        )}

        <article className="width-100  flex-center-between">
          <button
            className="boton_like"
            disabled={disablebtn}
            onClick={handleLike}
          >
            <Corazon className={likePulsado ? "rojo" : ""} />
            <span>{numLikesServices} likes</span>
          </button>
          <p> {comment?.create_at ? Fecha(comment.create_at) : ""}</p>
        </article>
      </div>
    </article>
  );
};

export default CommentCard;
