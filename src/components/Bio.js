import { useEffect, useState } from "react";
import { GetUser } from "../Api/Api";
import { useUser } from "../context/UserContext";

const Bio = () => {
  const { user } = useUser();
  const [bio, setBio] = useState({});

  useEffect(() => {
    const getUser = async () => {
     // console.log(user);

      try {
       
        const res = await GetUser(user.token);
       // console.log(res);
       // console.log(bio.avatar)

        if (res.statusText === "OK") {
          setBio(res.data.data[0]);
        }
      } catch (error) {
        console.log(error)
      }

    };
    getUser();
  }, []);

  return (
    <section className="bio_section">
      <article className="bio_det_box">
      
        <div >
          <img src={`http://localhost:4000/img/link/${bio.avatar}`} alt="avatar" />
        </div>
        <div className="bio_det flex-column-evenly">
          <h2>{bio.nombre}</h2>
          <p>{bio.username}</p>
          <p>{bio.email}</p>
          <p>{bio.biografia}</p>
          </div>
      </article>
    </section>
  );
};

export default Bio;
