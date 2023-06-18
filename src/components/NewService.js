import { useState } from "react";
import { SendService } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NewService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    const res = await SendService(data, user.token);
    // console.log(res);
    setTitle("");
    setDescription("");

    navigate(`/service/${res.data.id_servicio}`);
  };

  return (
    <>
      <h3>new service</h3>
      <form id="chat-input" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripcion"
        />

        <button>Enviar</button>
        {/* <label className="image-button">
        <span>📷</span>
        <input className="image-picker" type="file" onChange={e => sendImage(e.target.files[0])} />
      </label> */}
      </form>
    </>
  );
};

// const sendMessage = (message) => fetchPost('https://photochat.anxoso.com/message', { message })
// const sendImage = (image) => {
//   const body = new FormData()
//   body.append('image', image)
//   fetchPost('https://photochat.anxoso.com/image', body)}
