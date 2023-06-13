import React, { useEffect, useState } from "react";
import { Test } from "../Api/Api";

const Services = () => {
  const [services, setServices] = useState();

  const DataTest = async () => {
    //test de conexion con la base de datos
    try {
      const response = await Test();
    // console.log(response);
    setServices(response.data.data);
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    DataTest();
  }, []);

  // console.log(services?.data.data);

  return (
    <div className="services">
      <ul>
        {services?.map((e) => {
          return (
            <li key={e.idservicios}>
              <h3>{e.titulo}</h3>
              <p>{e.descripcion}</p>
              <p>{e.user_id}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Services;
