import React,{useEffect, useState} from 'react'
import { useUser } from "../context/UserContext";

const Notification = () => {
    const {notification} = useUser();
    const [display, setdisplay] = useState('none');
    useEffect(() => {
      notification ? setdisplay('flex') : setdisplay('none')
    }, [notification]);
  return (
    <div style={{display:display}} className='notification button-4 flex-center-center'>
     {notification}
    </div>
  )
}

export default Notification
