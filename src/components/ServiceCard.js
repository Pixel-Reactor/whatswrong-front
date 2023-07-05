import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { IconHeart, IconMessage2 } from "@tabler/icons-react";

const ServiceCard = (props) => {
  const navigate = useNavigate();
  const [data] = useState(props.data);
  const { imgLink } = useUser();
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
      className="services_card flex-column-between-left  position-relative"
      onClick={() => navigate(`/service/${data.idservicios}`)}
    >
      <article className="card_user_bio position-relative border-black" onClick={()=>{console.log('clicked');navigate(`/bio/${data.users_id}`)}} >
       
        {imgLink(data.avatar)}
      </article>
      <article className="card_title width-100 flex-center-between">
        <div>
          <p>{data.titulo}</p>
        </div>
        <div className={data.finalizado ? "button-7" : "button-8"}>
          {" "}
          {data.finalizado ? "cerrado" : "abierto"}
        </div>
      </article>
      <article className="card_description flex-center-between">
        <p>{data.descripcion}</p>
      </article>
      <article className="card_det width-100 flex-center-between">
        <div className="flex-center-center">
          <p className="flex-center-center margin-5">
            <IconHeart strokeWidth={"1.40"} />
            <b>{data.likes}</b>
          </p>
          <p className="flex-center-center margin-5">
            <IconMessage2 strokeWidth={"1.40"} />
            <b>{data.comentarios}</b>
          </p>
        </div>

        <p className="card_fecha">{Fecha()}</p>
      </article>
    </section>
  );
};

export default ServiceCard;
