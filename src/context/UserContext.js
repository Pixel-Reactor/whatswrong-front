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

  const fileLink = (file) => {
    try {
      const filename = JSON.parse(file);
      if (filename.type.indexOf('image') > -1) {
        console.log('hay una imagen');
        return <img src={`http://localhost:4000/img/link/${filename.name}`} />
      } else {
        if (filename.type.indexOf('pdf') > -1){
          return <embed src={`http://localhost:4000/img/link/${filename.name}`} width="80%" height="300" 
          type="application/pdf" />
        }
      
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <UserContext.Provider
      value={{ user, setUser, menuon, setMenuon, LogOut, errmsg, seterrmsg, fileLink }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
