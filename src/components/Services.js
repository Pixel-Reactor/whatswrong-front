import React, { useEffect, useState } from "react";
import { GetServices } from "../Api/Api";
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";
const Services = () => {
  const [services, setServices] = useState();
  const [orderby, setorderby] = useState('newest');
  const navigate= useNavigate();
  useEffect(() => {
    const allServices = async () => {
      try {
        const response = await GetServices(orderby);
        if (response.statusText === "OK") {
          setServices(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    allServices();
  }, [orderby]);


  return (
    <div className="services flex-column-center-top">
      <div className="width-100 flex-center-right padding-10">
        <div className="button-fancy-blue flex-center-center " onClick={()=>navigate('/newservice')}>+ Pregunta</div>
      </div>
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
