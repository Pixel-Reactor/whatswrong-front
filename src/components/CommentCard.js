import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {  IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { AddLike, DeleteComment, GetLikesComents } from "../Api/Api";
import { ReactComponent as Corazon } from "../images/corazon.svg";

const CommentCard = (props) => {
  const { user, fileLink, imgLink,setnotification,refreshservice,setrefreshservice} = useUser();
  const [optionsmenu, setoptionsmenu] = useState(false);
  const [refresh, setrefresh] = useState(0);
  const [comment,setComment] = useState();
  const [disablebtn, setdisablebtn] = useState(false);
  const [likePulsado, setLikePulsado] = useState("");
  const [numLikesServices, setNumLikesServices] = useState();


  useEffect(() => {
    setComment(props.data)
   }, [refresh]);

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

          const res = await AddLike(
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
  const Delete = async () => {
    console.log('clicked')
    const res = await DeleteComment({comm_id:comment.idcomentarios},user.token);
    console.log(res)
    res.data.ok? setrefreshservice(refreshservice +1) : setnotification('No ha sido posible eliminar')

  }
  useEffect(() => {
    const service = async () => {
      try {
        const res = await GetLikesComents(comment.idcomentarios);

        setNumLikesServices(res.data.data.length);
        const encontrar = res.data.data.find((e) => e.users_id === user.id);

        if (encontrar) {
          setLikePulsado(encontrar.idlikes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    service();
  }, [likePulsado]);
  return (
    <article className="service_card flex-column-center-top">
      <div className="flex-column-center-top service_box">
        <div className="flex-center-between width-100">
          <div className="flex-center-center">
            {comment?.avatar ? imgLink(comment.avatar) : ""}
            <p>
              <b className="margin-5">{comment?.owner ?? ""}</b>
            </p>
          </div>
          {user?.username === comment?.owner ? (
            <div
              className="margin-5 position-relative"
              onClick={() => {
                optionsmenu ? setoptionsmenu(false) : setoptionsmenu(true);
                console.log(optionsmenu);
              }}
            >
              <IconDotsVertical width={"20px"} strokeWidth={"1"} />
              <div className=" flex-center-left">
                <ul
                  style={{ display: optionsmenu ? "flex" : "none" }}
                  className=" flex-column-center"
                >
                 
                  <li className="button-7 flex-center-centrer mini-menu-options" onClick={()=>Delete()}>
                   <span><IconTrash width={'20px'} /></span> 
                    <p>Borrar</p>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
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
