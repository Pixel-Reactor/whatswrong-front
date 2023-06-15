import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import userimg from '../images/user.png'
import logoutimg from '../images/logout.png'


const Minimenu = () => {
    const {menuon,setMenuon,user,LogOut} = useUser();

    const navigate = useNavigate();
   
    const [modal, setmodal] = useState({
        display: 'block',
        position: 'absolute',
        top: '80px',
        right: '10px',
        height: '260px',
        width: '200px',
        transition: 'all 0.5s',
        overFlow: 'hidden',
        opacity: '0',
        zIndex: '1' ,
        border: '2px solid black',
        borderRadius:'10px'
    });

    useEffect(() => {
        if (menuon === false) {
            setmodal({ ...modal, opacity: '1', top: '74px', zIndex: '1000' })

        } else {
            setmodal({ ...modal, zIndex: '-1', opacity: '0', top: '80px' })
        }
    }, [menuon]);
    return (
      <div style={modal} >
            <ul className='mini-menu flex-column-center'>
                <li className='mini-menu-bio flex-center-center' onClick={() => navigate('/me')}>
                 {user.username}
                </li>
                <li className='mini-menu-li flex-center-left ' onClick={() => navigate('/me')}>
                <img src={userimg} alt="" width={'25px'} /><p className='mg10'>  Ver Perfil</p> </li>

                <li className='mini-menu-li flex-center-left ' 
                onClick={()=>
                {
                    LogOut();
                    setMenuon(true)
                }} > 
                <img src={logoutimg} alt="" width={'25px'} /><p className='button-small-red flex-center-center' > Cerrar session</p>  </li>

            </ul>
        </div> 
    )
}

export default Minimenu
