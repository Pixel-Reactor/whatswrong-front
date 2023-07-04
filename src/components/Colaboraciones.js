import { useEffect, useState } from "react";
import { GetColaboraciones } from "../Api/Api";
import { useUser } from "../context/UserContext";

export const Colaboraciones = () => {
  const { user } = useUser();
  const [colaboraciones1, setColaboraciones1] = useState();
  const [colaboraciones2, setColaboraciones2] = useState();

  useEffect(() => {
    const colaboraciones = async () => {
      // console.log(user);

      try {
        const res = await GetColaboraciones(user.token);
        // console.log(res);

        if (res?.statusText === "OK") {
          setColaboraciones1(res.data.data1);
          setColaboraciones2(res.data.data2);
        }
      } catch (error) {
        console.log(error);
      }
    };

    colaboraciones();
  }, []);

  return (
    <>
      <h3>Actividad</h3>
      <ul className="colaboraciones">
        {colaboraciones1?.map((e) => (
          <li key={e.idservicios}>
            <h3>{e.titulo}</h3>
            <p>{e.descripcion}</p>
            <span>{e.create_at}</span>
          </li>
        ))}
      </ul>
      <h3>Comentarios en los que colaboras</h3>
      <ul className="colaboraciones">
        {colaboraciones2?.map((e) => (
          <li key={e.idcomentarios}>
            <p>{e.comentario}</p>
            <span>{e.create_at}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
