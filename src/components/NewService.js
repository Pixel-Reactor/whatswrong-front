import { useState } from "react";
import { SendService } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const NewService = () => {
  const [service, setservice] = useState({});

  const [hashtag1, setHashtag1] = useState(true);
  const [hashtag2, setHashtag2] = useState(false);
  const [hashtag3, setHashtag3] = useState(false);
  const [hashtag4, setHashtag4] = useState(false);
  const [hashtag5, setHashtag5] = useState(false);

  const [file, setfile] = useState("");
  const { user, setnotification } = useUser();
  const [disablemod, setdisablemod] = useState({
    display: user.token ? "none" : "flex",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setservice({
      ...service,
      [e.target.name]: e.target.value || null,
    });
    // console.log(service);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await SendService(service, file, user.token);
      setnotification(res.data.message);
      navigate(`/service/${res.data.id_servicio}`);
    } catch (error) {
      if (error.response.data.message) {
        setnotification(error.response.data.message);
        console.log("error");
      }
      console.log(error);
    }
  };

  return (
    <>
      <main className="new_question flex-column-center-top">
        <div style={disablemod} className="disable-modal flex-center-center ">
          <div className="button-4">
            Tienes que estar registrado para poder enviar una pregunta,
            <br /> usa los botones arriba para log in o sign up
          </div>
        </div>
        <h3>Que quieres preguntar?</h3>
        <form
          className="question_form flex-column-between"
          onSubmit={handleSubmit}
        >
          <div className="form-item">
            <input onChange={handleChange} name="title" placeholder="Title" />
          </div>

          <textarea
            className="new_question_textarea"
            onChange={handleChange}
            name="description"
            placeholder="Descripcion"
          />
          <div className="hashtag_input">
            <input
              onChange={handleChange}
              onBlur={() => setHashtag2(true)}
              name="hashtag1"
              placeholder="hashtag"
            />
            {hashtag2 && (
              <input
                onChange={handleChange}
                onBlur={() => setHashtag3(true)}
                name="hashtag2"
                placeholder="hashtag"
              />
            )}
            {hashtag3 && (
              <input
                onChange={handleChange}
                onBlur={() => setHashtag4(true)}
                name="hashtag3"
                placeholder="hashtag"
              />
            )}
            {hashtag4 && (
              <input
                onChange={handleChange}
                onBlur={() => setHashtag5(true)}
                name="hashtag4"
                placeholder="hashtag"
              />
            )}
            {hashtag5 && (
              <input
                onChange={handleChange}
                name="hashtag5"
                placeholder="hashtag"
              />
            )}
          </div>

          <input
            className="file-input"
            type="file"
            name="fichero"
            onChange={(e) => setfile(e.target.files[0])}
          />

          <div className="form-item">
            <button disabled={user.token ? false : true}>Enviar</button>
          </div>
        </form>
      </main>
    </>
  );
};
