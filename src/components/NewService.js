import { useState } from "react";
import { SendService } from "../Api/Api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const NewService = () => {
  const [service, setservice] = useState({});
 
  const [file, setfile] = useState('');
  const { user ,setnotification} = useUser();
  const [disablemod, setdisablemod] = useState({
    display:user.token ? 'none' : 'flex'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setservice({
      ...service,
      [e.target.name]: e.target.value
    })
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await SendService(service,file, user.token);
    setnotification(res.data.message)
   navigate(`/service/${res.data.id_servicio}`);
   
    } catch (error) {
      if(error.response.data.message){
        setnotification(error.response.data.message)
        console.log('error')
      }
      console.log(error)
    }
   
    
  };

  return (
    <>
    
      <main className="new_question flex-column-center-top">
        <div style={disablemod} className="disable-modal flex-center-center ">
          <div  className="button-4">Tienes que estar registrado para poder enviar una pregunta, 
          <br /> usa los botones arriba para log in o sign up
          </div>
          </div>
         <h3>Que quieres preguntar?</h3>
         <form className="question_form flex-column-between" onSubmit={handleSubmit}>
           <div className="form-item">
             <input
               onChange={handleChange}
               name="title"
               placeholder="Title"
             />
           </div>
           
             <textarea 
              className="new_question_textarea"
               onChange={handleChange}
               name="description"
               placeholder="Descripcion"
             />
 
 
           <input className='file-input' type="file" name="fichero" onChange={(e)=>setfile(e.target.files[0])} />
 
 
           <div className="form-item">
           <button disabled={user.token? false : true}>Enviar</button>
           </div>
 
 
         </form> 
         
       
      </main>

    </>
  );
};


