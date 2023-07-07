import { useEffect, useState } from "react";
import { GetUserById } from "../Api/Api";
import { useUser } from "../context/UserContext";

import ServiceCard from "./ServiceCard";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";

const BioById = () => {
  const { byId } = useParams();
  const { user, fileLink } = useUser();
  const [usuario, setUsuario] = useState();
  const [colaboraciones1, setColaboraciones1] = useState();
  const [colaboraciones2, setColaboraciones2] = useState();
  const [activitysel, setactivitysel] = useState("services");

  useEffect(() => {
    const usuario = async () => {
      try {
        const res = await GetUserById(byId);
        // console.log(res);

        if (res?.statusText === "OK") {
          setUsuario(res.data.data[0]);
          setColaboraciones1(res.data.servicios);
          setColaboraciones2(res.data.comentarios);
        }

        // console.log(bio);
      } catch (error) {
        console.log(error);
      }
    };

    usuario();
  }, []);

  return (
    <section className="bio_section">
      <article className="margin-bottom-20">
        <article className="bio_det_box">
          {fileLink(usuario?.avatar)}

          <div className="bio_det flex-column-evenly">
            <h2>{usuario?.nombre}</h2>
            <p>{usuario?.username}</p>

            <p>{usuario?.biografia}</p>
          </div>
        </article>
      </article>

      <article className=" padding-10">
        <h3>Actividad</h3>
      </article>

      <section className="order_box  flex-center-left">
        <article className="order_select flex-center-center ">
          <div
            className={activitysel === "services" ? "select" : ""}
            onClick={() => setactivitysel("services")}
          >
            Servicios
          </div>
          <div
            className={activitysel === "comments" ? "select" : ""}
            onClick={() => setactivitysel("comments")}
          >
            Comentarios
          </div>
        </article>
      </section>
      {activitysel === "services" ? (
        <article className="activity flex-column-top-right">
          {colaboraciones1?.map((item) => (
            <ServiceCard key={item.idservicios} data={item} />
          )) ?? "loading"}
        </article>
      ) : (
        <article className="activity">
          <ul className="services_ul  flex-column-center">
            {colaboraciones2 ? (
              colaboraciones2.map((comm) => (
                <CommentCard key={comm.idcomentarios} data={comm} />
              ))
            ) : (
              <div className="button-4 text-center ">
                <p>No se han encontrado comentarios</p>
              </div>
            )}
          </ul>
        </article>
      )}
    </section>
  );
};

export default BioById;
