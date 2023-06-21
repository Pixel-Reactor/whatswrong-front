import React, { useState, useEffect } from "react";
import { GetUserDet } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ServiceCard = (props) => {
  const navigate = useNavigate();
  const [data, setdata] = useState(props.data);
  const [owner, setowner] = useState("");
  const { user } = useUser();
  const Fecha = () => {
    const date = new Date(data.create_at);
    const now = new Date();
    const difference = Math.abs(date - now);
    const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
console.log(data)
    if (diffDays > 1) {
      return `hace ${diffDays - 1} ${diffDays - 1 === 1 ? "dia" : "dias"}`;
    } else {
      return `hoy`;
    }
  };

  useEffect(() => {
    const Owner = async () => {
      const response = await GetUserDet(data.users_id);
      setowner(response.data.data[0]);
    };
    Owner();
  }, []);
  return (
    <div
      className="service_card flex-center-left "
      onClick={() => navigate(`/service/${data.idservicios}`)}
    >
        <div className="flex-column-right services_det">
            <p><b className="color-black">{data.comentarios}</b> respuestas </p>
            <p><b>{data.likes}</b> likes </p>
            </div>
        <div className="flex-column-center-top service_box">
            <div className="service_card_det flex-center-right">
        <p className="button-small-green flex-center-center">
          {data.finalizado ? "cerrado" : "abierto"}{" "}
        </p>
      </div>
      <div className="margin-5">
        <h2 className="card_title">{data.titulo}</h2>
      </div>
      <div className="margin-y-10-x-5">
        <p>{data.descripcion}</p>
      </div>
      <div className="service_card_owner flex-column-left">
        <div className="flex-center-between">
          <div className="flex-center-center">
            <p className="margin-5">preguntado por : </p>{" "}
            {owner.avatar ? (
              <img
                className="bio_img"
                src={`http://localhost:4000/img/link/${data.avatar}`}
                alt="avatar"
                width={"20px"}
              />
            ) : (
              <img className="bio_img"
                src={require('../images/default_avatar.png')}
                alt="avatar"
                width={"20px"}
              />
            )}
            <p>
              {" "}
              <b className="margin-5">{owner.username}</b>{" "}
            </p>
          </div>
          <div>
            <p> {Fecha()}</p>
          </div>
        </div>
      </div></div>
      
    </div>
  );
};

export default ServiceCard;
