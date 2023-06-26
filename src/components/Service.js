import React, { useEffect, useState } from "react";
import { GetService, SendComment } from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import CommentCard from "./CommentCard";
import { MarkDone } from "../Api/Api";
import { IconFilePlus, IconPhoto, IconDotsVertical, IconTrash, IconCircleCheck } from '@tabler/icons-react';

const Service = () => {

  const [servicedet, setServicedet] = useState();
  const [refresh, setrefresh] = useState(0);
  const [owner, setOwner] = useState();
  const [coments, setComents] = useState();
  const [file, setFile] = useState();
  const [optionsmenu, setoptionsmenu] = useState(false);
  const [fileupload, setfileupload] = useState(false);
  const { id } = useParams();
  const [comentarioText, setComentarioText] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  const Fecha = (fecha) => {
    const date = new Date(fecha);
    const now = new Date();
    const difference = Math.abs(date - now);
    const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return `hace ${diffDays - 1} ${diffDays - 1 === 1 ? "dia" : "dias"}`;
    } else {
      return `hoy`;
    }
  };

  const imgLink = (img) => {
    try {
      const imgname = JSON.parse(img);
      return imgname.name
    } catch (error) {
      return 'not-found.png'
    }

  }

  const Done = async () => {
    const response = await MarkDone({ done: id }, user.token)
   
    if(response.data === 'ok'){
     setrefresh(refresh + 1)
    }
  }
  const Delete = async () => {
    const response = await MarkDone({ delete: id }, user.token)
    if(response.data === 'ok'){
      navigate('/')
    }
  }

  useEffect(() => {
    const service = async () => {
      try {
        const response = await GetService(id);

        if (response.statusText === "OK") {
          setServicedet(response.data.dataService[0]);
          setOwner(response.data.owner[0]);
          setComents(response.data.dataComents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    service();
  }, [comentarioText,refresh]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SendComment(
        {
          comment: comentarioText,
          service_id: id,
        },
        file,
        user.token,

      );
      setComentarioText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setComentarioText(e.target.value);
  };

  return (
    <div className="services flex-column-center-top">

      <div className="service_card flex-column-center-top">

        <div className="flex-column-center-top service_box">
          <div className="flex-center-between width-100">
            <div className="flex-center-center">
              {owner?.avatar ? (
                <img
                  className="bio_img"
                  src={`http://localhost:4000/img/link/${imgLink(owner.avatar)}`}
                  alt="avatar"
                  width={"20px"}
                />
              ) : (
                <img className="bio_img"
                  src={require('../images/default_avatar.png')}
                  alt="avatar"
                  width={"20px"}
                />
              )}
              <p>

                <b className="margin-5">{owner?.username ?? ''}</b>
              </p>
              <p className="margin-5">pregunta : </p>{" "}
            </div>
            {user?.username === owner?.username ?
              <div className="margin-5 position-relative"
                onClick={() => { optionsmenu ? setoptionsmenu(false) : setoptionsmenu(true) }}>
                <IconDotsVertical width={'20px'} bbox={'1px solid black'} strokeWidth={'1'} />
                <div >
                  <ul style={{ display: optionsmenu ? 'flex' : 'none' }} className='mini-menu-options flex-column-center'
                  >
                    <li className='flex-center-left button-4' onClick={Done}>
                      <IconCircleCheck /><p>Resuelto</p> </li>
                    <li className='button-7 flex-center-left' onClick={Delete}>
                      <IconTrash /><p> Borrar</p></li>
                  </ul></div>
              </div> : ''}

          </div>
          <div className="service_card_det flex-center-right">
            <p className="button-small-green flex-center-center">
              {servicedet?.finalizado ?
                <div className="button-8 flex-center-center">
                  <p>resuelto!</p></div>
                : <div className="button-8">
                  <p>Abierto</p></div>}
            </p>
          </div>
          <div className="margin-5">
            <h2 className="card_title">{servicedet?.titulo ?? 'loading'}</h2>
          </div>
          <div className="margin-y-10-x-5">
            <p>{servicedet?.descripcion ?? 'loading'}</p>
          </div>
          {servicedet?.fichero ?
            <div className="question_img_box">
              <img src={`http://localhost:4000/img/link/${imgLink(servicedet.fichero)}`} width={'100%'} alt="" />
            </div> : ' '}


          <div className="service_card_owner flex-column-left">
            <div className="flex-center-between">


              <div className="width-100 flex-center-left">
                <p> {servicedet?.create_at ? Fecha(servicedet.create_at) : ''}</p>
              </div>
            </div>
          </div></div>


      </div>
      {user.token ? (
        <form onSubmit={handleSubmit} className="service_form flex-column-center">
          <p className="width-100 padding-10">Tu respuesta</p>
          <textarea
            name="comentario"
            id="comentario"
            cols="50"
            rows="5"
            placeholder="Escribe aqui tu respuesta"
            value={comentarioText}
            onChange={handleChange}
          ></textarea>
          <div className="width-100 flex-center-left padding-10">
            <div className="button-4 " onClick={() => setfileupload(true)}><IconFilePlus /> <br /> file</div>

            <div className="button-4" onClick={() => setfileupload(true)}> <IconPhoto /> <br /> imagen</div>
          </div>
          {fileupload ? <div className="width-100 padding-10 flex-center-between">
            <input type="file" value={!file ? '' : null} onChange={(e) => setFile(e.target.files[0])} />
            <button className="button-7 flex-center-center" onClick={() => { setFile(''); setfileupload(false) }}>Cancelar</button></div> : ''}
          <button className="button-8 width-100">Enviar</button>
        </form>
      ) : (
        <div className="not_comment_box flex-center-center" onClick={() => navigate('/signin')}>
          <div className="button-4 ">
            <p>Registrate o accede para poder hacer un commentario</p>
          </div></div>

      )}

      <ul className="services_ul flex-column-center">
        {coments ? coments.map(comm => <CommentCard key={comm.idcomentarios} data={comm} />) : <div className="button-4 text-center ">
          <p> Se el primero en responder a esta pregunta!</p>
        </div>}
      </ul>
    </div>
  );
};




export default Service;
