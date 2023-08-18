import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { IconHeart, IconMessage2 } from "@tabler/icons-react";

const ServiceCard = (props) => {
  const navigate = useNavigate();
  const [linkhandler, setlinkhandler] = useState(true);
  const [data] = useState(props.data);
  const { imgLink } = useUser();
  const { user } = useUser();
  const HandleLink = (link) => {
    if (link === "user") {
      setlinkhandler(false);
      navigate(`/usuario/${data.users_id}`);
    }
    if (link === "servicio" && linkhandler) {
      navigate(`/service/${data.idservicios}`);
    }
  };
  const Fecha = () => {
    const date = new Date(data.create_at);
    const now = new Date();
    const difference = Math.abs(date - now);
    const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return `hace ${diffDays - 1} ${diffDays - 1 === 1 ? "dia" : "dias"}`;
    } else {
      return `hoy`;
    }
  };
  return (
    <section
      className="services_card flex-column-between-left  position-relative border-radius"
      onClickCapture={() => HandleLink("servicio")}
    >
      <article
        className="card_user_bio position-relative border-black"
        onClickCapture={() => HandleLink("user")}
      >
        {imgLink(data.avatar)}
      </article>
      <article className="card_title width-100 flex-center-between">
        <div>
          <p>{data.titulo}</p>
        </div>
        <div
          className={
            data.finalizado ? "button-7 nopointer" : "button-8 nopointer"
          }
        >
          {" "}
          {data.finalizado ? "cerrado" : "abierto"}
        </div>
      </article>
      <article className="card_description position-relative flex-column-center-top">
        <div className="card_description_blur"></div>
        <p>{data.descripcion}</p>
      </article>

      <article className="card_det width-100 flex-center-between">
        <div className="flex-center-center">
          <p className="flex-center-center margin-5">
            <IconHeart strokeWidth={"1.40"} width={"18px"} />
            <b>{data.likes}</b>
          </p>
          <p className="flex-center-center margin-5">
            <IconMessage2 strokeWidth={"1.40"} width={"18px"} />
            <b>{data.comentarios}</b>
          </p>
        </div>

        <p className="card_fecha">{Fecha()}</p>
      </article>
    </section>
  );
};

export default ServiceCard;
