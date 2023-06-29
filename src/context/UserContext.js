import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useCookies } from "react-cookie";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [menuon, setMenuon] = useState(true);
  const [errmsg, seterrmsg] = useState({ on: false, message: "" });
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const cookie = cookies;
    if (cookie.wwuser) {

      setUser(cookie.wwuser);
    }
  }, []);
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    if (user.token) {
      setCookie("wwuser", user, { expires: date });
    }
  }, [user.token]);
  const LogOut = () => {
    removeCookie("wwuser", { path: "/" });
    setUser("");
  };

  const imgLink = (img) =>{
 try {
  const imgname = JSON.parse(img);
  if(imgname.name){
    return  <img
    src={`http://localhost:4000/img/link/${imgname.name}`}
    alt="avatar"
  />
  }else{
    return <img
    src={require('../images/not-found.png')}
    alt="avatar"
  />
  }
 
 } catch (error) {
  return <img
  src={require('../images/not-found.png')}
  alt="avatar"
/>
 }

  }

  
  const fileLink = (file) => {
    try {
      const filename = JSON.parse(file);
      if (filename.type.indexOf('image') > -1) {
        console.log('hay una imagen');
        return <img src={`http://localhost:4000/img/link/${filename.name}`} />
      } else {
        if (filename.type.indexOf('pdf') > -1){

         return <object  width="80%" height="400" type="application/pdf" data={`http://192.168.1.143:4000/img/link/${filename.name}?#zoom=85&scrollbar=0&toolbar=0&navpanes=0`}>
           <embed src={`http://localhost:4000/img/link/${filename.name}`} type="application/pdf"></embed>
           <div  className="width-100 flex-center-center padding-10"><p className="button-4 ">Este browser no suporta pdf, <br />descargarlo con el boton de arriba</p></div>
           </object>

         
        }
      
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <UserContext.Provider
      value={{ user, setUser, menuon, setMenuon, LogOut, errmsg, seterrmsg, fileLink,imgLink }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
