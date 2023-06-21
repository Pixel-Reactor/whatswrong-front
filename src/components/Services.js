import React, { useEffect, useState } from "react";
import { GetServices } from "../Api/Api";

import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState();

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
      {services
        ?.sort((a, b) => b.idservicios - a.idservicios)
        .map((item) => <ServiceCard key={item.idservicios} data={item} />) ??
        "no hay servicios"}
    </div>
  );
};

export default Services;
