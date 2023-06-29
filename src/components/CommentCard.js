import React, { useState } from 'react'
import { useUser } from "../context/UserContext";
import { IconPencil, IconDotsVertical, IconTrash } from '@tabler/icons-react';

const CommentCard = (props) => {
  const { user ,fileLink,imgLink} = useUser();
  const [optionsmenu, setoptionsmenu] = useState(false);
  const [comment] = useState(props.data);
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


  return (
    <article className="service_card flex-column-center-top">
      <div className="service_card flex-column-center-top">

        <div className="flex-column-center-top service_box">
          <div className="flex-center-between width-100">
            <div className="flex-center-center">
              {comment?.avatar ? (
               imgLink(comment.avatar)
              ) :  ''}
              <p>

                <b className="margin-5">{comment?.owner ?? ''}</b>
              </p>

            </div>
            {user?.username === comment?.owner ?
              <div className="margin-5 position-relative" onClick={()=>{optionsmenu? setoptionsmenu(false) : setoptionsmenu(true);console.log(optionsmenu)}} >
                <IconDotsVertical width={'20px'}  strokeWidth={'1'} />
                <div> 
                   <ul style={{display: optionsmenu? 'flex' : 'none'}} className='mini-menu-options flex-column-center'
                  >
                  <li className='flex-center-left button-4'>
                    <IconPencil /><p>Editar</p> </li>
                  <li className='button-7 flex-center-left'>
                    <IconTrash /><p> Borrar</p></li>
                </ul></div>
              
              </div> : ''}

          </div>


          <div className="margin-y-10-x-5">
            <p>{comment?.comentario ?? 'loading'}</p>
          </div>
          {comment?.fichero_comentario ?
            <div className="question_img_box">
             {fileLink(comment.fichero_comentario)}
            </div> : ' '}


          <div className="service_card_owner flex-column-left">
            <div className="flex-center-between">


              <div className="width-100 flex-center-left">
                <p> {comment?.create_at ? Fecha(comment.create_at) : ''}</p>
              </div>
            </div>
          </div></div>


      </div>
    </article>
  )
}

export default CommentCard
