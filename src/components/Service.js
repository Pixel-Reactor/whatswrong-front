import React, { useEffect, useState } from "react";
import { GetService, SendComment } from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Service = () => {
  const [servicedet, setServicedet] = useState();
  const [owner, setOwner] = useState();
  const [coments, setComents] = useState();
  const { id } = useParams();
  const [comentarioText, setComentarioText] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

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
      //test de conexion con la base de datos
      try {
        const response = await GetService(id);

        console.log(response.data.dataService[0].fichero);
        // console.log(response.data.dataService);
        // console.log(response.data.dataComents); 

        if (response.statusText === "OK") {
          setServicedet(response.data.dataService[0]);
          console.log(servicedet)
          setOwner(response.data.owner[0]);
          console.log(owner)
          setComents(response.data.dataComents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    service();
  }, [comentarioText]);

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
              <img className="bio_img"
                src={require('../images/default_avatar.png')}
                alt="avatar"
                width={"20px"}
              />
            )}
              <p>
               
                <b className="margin-5">{owner?.username ?? ''}</b>
              </p>
              <p className="margin-5">pregunta : </p>{" "}
            </div>
        <div className="service_card_det flex-center-right">
          <p className="button-small-green flex-center-center">
            {servicedet?.finalizado ? "cerrado" : "abierto"}{" "}
          </p>
        </div>
        <div className="margin-5">
          <h2 className="card_title">{servicedet?.titulo ?? 'loading'}</h2>
        </div>
        <div className="margin-y-10-x-5">
          <p>{servicedet?.descripcion ?? 'loading'}</p>
        </div>
        {servicedet?.fichero? 
         <div className="question_img_box">
          <img src={`http://localhost:4000/img/link/${JSON.parse(servicedet.fichero).name}`} width={'100%'} alt="" />
          </div> : ' '}
        
         
        <div className="service_card_owner flex-column-left">
          <div className="flex-center-between">

          
            <div>
              <p> {servicedet?.create_at? Fecha(servicedet.create_at) : ''}</p>
            </div>
          </div>
        </div></div>
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
          .map((e) => (
            <li key={e.idcomentarios} className="services_li">
              <p>{e.comentario}</p>
              <span>
                {" "}
                {`Autor: ${e.users_id} ${new Date(
                  e.create_at
                ).toLocaleDateString()} `}
              </span>
            </li>
          )) ?? "Servicio no encontrado"}
      </ul>
    </div>
  );
};
   



export default Service;
