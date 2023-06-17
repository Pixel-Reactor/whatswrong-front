import React, { useEffect, useState } from "react";
import { GetService } from "../Api/Api";
import { useParams } from "react-router-dom";

const Service = () => {
  const [oneService, setOneService] = useState();
  const { id } = useParams();

  useEffect(() => {
    const service = async () => {
      //test de conexion con la base de datos
      try {
        const response = await GetService(id);

        // console.log(response.data.data[0]);
        // console.log(response);

        if (response.statusText === "OK") {
          setOneService(response.data.data);
        }
        // console.log(oneService);
      } catch (error) {
        console.log(error);
      }
    };
    service();
  }, []);

  // console.log(oneService);

  return (
    <div className="service">
      <ul>
        {oneService?.map((e) => (
          <li key={e.idservicios}>
            <h3>{e.titulo}</h3>
            <p>{e.descripcion}</p>
            <p>{e.users_id}</p>
          </li>
        )) ?? "no hay servicios"}
      </ul>
    </div>
  );
};

export default Service;
