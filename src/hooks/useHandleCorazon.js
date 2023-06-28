import { ReactComponent as Corazon } from "../images/corazon.svg";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { AddLike, GetLikesComents } from "../Api/Api";

export const Corazon1 = ({ comentarios_id }) => {
  const { user } = useUser();
  const [corazonComentario, setCorazonComentario] = useState();
  const [numeroLikesComentarios, setNumeroLikesComentarios] = useState();
  useEffect(() => {
    const getlikescoments = async () => {
      try {
        const resLikes = await GetLikesComents(comentarios_id);
        const encontrar = resLikes.data.data.find(
          (e) => e.users_id === user.id
        );
        // console.log(encontrar);
        setNumeroLikesComentarios(resLikes.data.data.length);

        if (encontrar) {
          setCorazonComentario(encontrar.idlikes);
        }
        // console.log(corazonComentario);
        // console.log("useEffect");
      } catch (error) {
        console.log(error);
      }
    };
    getlikescoments();
  }, [corazonComentario]);

  const handleCorazon = async () => {
    try {
      if (corazonComentario > 0) {
        await AddLike(
          {
            comentarios_id: comentarios_id,
            idLikes: corazonComentario,
          },
          user.token
        );
        setCorazonComentario(0);
      } else {
        const res = await AddLike(
          {
            comentarios_id: comentarios_id,
          },
          user.token
        );
        // console.log(res);
        if (res.statusText === "OK") {
          setCorazonComentario(res.data.data.insertId);
          //   console.log(res.data.data.insertId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="boton_like" onClick={handleCorazon}>
      <Corazon
        // onClick={(e) => this.handleCorazon(e, el.idcomentarios)}
        className={corazonComentario > 0 ? "rojo" : ""}
      />
      <span>{numeroLikesComentarios} likes</span>
    </div>
  );
};
