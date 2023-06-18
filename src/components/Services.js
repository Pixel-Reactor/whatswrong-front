import React, { useEffect, useState } from "react";
import { GetServices } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState();
  const { user } = useUser();

  useEffect(() => {
    const allServices = async () => {
      //test de conexion con la base de datos
      try {
        const response = await GetServices();
        // console.log(response.data.data);
        if (response.statusText === "OK") {
          // console.log(response);
          setServices(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    allServices();
    // console.log(user);
  }, []);

  // console.log(services?.data.data);

  return (
    <div className="services flex-column-center-top">
      <ul className="services_ul flex-column-center">
        {services
          ?.sort((a, b) => b.idservicios - a.idservicios)
          .map((e) => (
            <li key={e.idservicios} className="services_li">
              <h3>{e.titulo}</h3>
              <p>{e.descripcion}</p>
              <span>
                {`Autor: ${e.users_id} ${new Date(
                  e.create_at
                ).toLocaleDateString()} `}
                <Link to={`/service/${e.idservicios}`}>Comentar</Link>
              </span>
            </li>
          )) ?? "no hay servicios"}
      </ul>
    </div>
  );
};

export default Services;
