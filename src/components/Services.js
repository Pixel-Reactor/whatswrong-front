import React, { useEffect, useState } from "react";
import { GetServices } from "../Api/Api";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Services = () => {
  const [services, setServices] = useState();
  const [orderby, setorderby] = useState("newest");
  const navigate = useNavigate();
  const { setsrcon } = useUser();
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
    <section
      className="services  flex-column-top-right"
      onClick={() => setsrcon(false)}
    >
      <article className="width-100 services_nav flex-center-between padding-10">
        <div>
          <b>{services?.length ?? ""}</b> preguntas
        </div>
        <div
          className="button-fancy-blue flex-center-center "
          onClick={() => navigate("/newservice")}
        >
          + Pregunta
        </div>
      </article>
      <section className="order_box flex-center-right">
        <article className="order_select flex-center-center pointer">
          <div
            className={orderby === "newest" ? "select" : ""}
            onClick={() => setorderby("newest")}
          >
            Nuevos
          </div>
          <div
            className={orderby === "likes" ? "select" : ""}
            onClick={() => setorderby("likes")}
          >
            Likes
          </div>
          <div
            className={orderby === "comments" ? "select" : ""}
            onClick={() => setorderby("comments")}
          >
            Comentarios
          </div>
          <div
            className={orderby === "done" ? "select" : ""}
            onClick={() => setorderby("done")}
          >
            Abierto
          </div>
        </article>
      </section>
      <section className="services_container flex-column-right pointer">
        {services?.map((item) => (
          <ServiceCard key={item.idservicios} data={item} />
        )) ?? "no hay servicios"}
      </section>
    </section>
  );
};

export default Services;
