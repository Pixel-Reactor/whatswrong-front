import React, { useEffect, useState } from "react";
import { GetService, SendComment } from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Service = () => {
  const [oneService, setOneService] = useState();
  const [coments, setComents] = useState();
  const { id } = useParams();
  const [comentarioText, setComentarioText] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const service = async () => {
      //test de conexion con la base de datos
      try {
        const response = await GetService(id);

        // console.log(response);
        // console.log(response.data.dataService);
        // console.log(response.data.dataComents);

        if (response.statusText === "OK") {
          setOneService(response.data.dataService);
          // console.log(oneService);
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
      <ul className="services_ul flex-column-center">
        {oneService?.map((e) => (
          <li key={e.idservicios} className="services_li">
            <h3>{e.titulo}</h3>
            <p>{e.descripcion}</p>
            <span>
              {" "}
              {`Autor: ${e.users_id} ${new Date(
                e.create_at
              ).toLocaleDateString()} `}
            </span>
          </li>
        )) ?? "Servicio no encontrado"}
      </ul>
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
