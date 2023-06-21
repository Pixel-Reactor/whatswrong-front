import React, { useEffect, useState } from "react";
import { GetServices } from "../Api/Api";

import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState();
  const [orderby, setorderby] = useState('newest');
  useEffect(() => {
    const allServices = async () => {
      //test de conexion con la base de datos
      try {
        const response = await GetServices(orderby);
        // console.log(response.data.data);
        if (response.statusText === "OK") {
          // console.log(response);
          setServices(response.data.data);
          console.log(services)
        }
      } catch (error) {
        console.log(error);
      }
    };
    allServices();
    // console.log(user);
  }, [orderby]);

  // console.log(services?.data.data);

  return (
    <div className="services flex-column-center-top">
     <div className="order_box flex-center-between">
      <div> <b>{services?.length ?? ''}</b> preguntas</div>
      <div className="order_select flex-center-center">
       <div className={orderby === 'newest' ? 'select' : ''} onClick={()=>setorderby('newest')}>Nuevos</div>
       <div className={orderby === 'likes' ? 'select' : ''} onClick={()=>setorderby('likes')}>Likes</div>
       <div className={orderby === 'comments' ? 'select' : ''}  onClick={()=>setorderby('comments')}>Comentarios</div>
       <div className={orderby === 'done' ? 'select' : ''} onClick={()=>setorderby('done')}>Abierto</div>

      </div>
     </div>
      {services
        ?.map((item) => <ServiceCard key={item.idservicios} data={item} />) ??
        "no hay servicios"}
    </div>
  );
};

export default Services;
