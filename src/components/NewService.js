import { useState } from "react";
import { SendService } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const NewService = () => {
  const [service, setservice] = useState({});
  const [file, setfile] = useState('');
  const { user } = useUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setservice({
      ...service,
      [e.target.name]: e.target.value
    })
    console.log(service,file)
  }
  const handleFile = (e) =>{
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await SendService(service,file, user.token);
    console.log(res);
   navigate(`/service/${res.data.id_servicio}`);
   
    } catch (error) {
      console.log(error)
    }
   
    
  };

  return (
    <>
      <div className="new_question flex-column-center-top">
        <h3>Que quieres preguntar?</h3>
        <form className="question_form flex-column-between" onSubmit={handleSubmit}>
          <div className="form-item">
            <input
              onChange={handleChange}
              name="title"
              placeholder="Title"
            />
          </div>
          <div className="form-item">
            <input
              onChange={handleChange}
              name="description"
              placeholder="Descripcion"
            /></div>


          <input className='file-input' type="file" name="fichero" onChange={(e)=>setfile(e.target.files[0])} />


          <div className="form-item">
            <button>Enviar</button>
          </div>


        </form>
      </div>

    </>
  );
};

// const sendMessage = (message) => fetchPost('https://photochat.anxoso.com/message', { message })
// const sendImage = (image) => {
//   const body = new FormData()
//   body.append('image', image)
//   fetchPost('https://photochat.anxoso.com/image', body)}
