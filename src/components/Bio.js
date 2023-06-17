import { useEffect, useState } from "react";
import { GetUser } from "../Api/Api";
import { useUser } from "../context/UserContext";
import avatar from "../images/avatar.png";

const Bio = () => {
  const { user } = useUser();
  const [bio, setBio] = useState({});

  useEffect(() => {
    const getUser = async () => {
      // console.log(user);
      const res = await GetUser(user.token);
      // console.log(res);

      if (res.statusText === "OK") {
        setBio(res.data.data[0]);
      }
    };
    getUser();
  }, []);

  return (
    <section className="bio_section">
      <img src={avatar} alt="avatar"></img>
      <p>{bio.nombre}</p>
      <p>{bio.username}</p>
      <p>{bio.email}</p>
      <p>{bio.biografia}</p>
    </section>
  );
};

export default Bio;
