import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useCookies } from "react-cookie";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [txt, settxt] = useState('');

  const [refreshservice, setrefreshservice] = useState(0);
  const [menuon, setMenuon] = useState(true);
  const [errmsg, seterrmsg] = useState({ on: false, message: "" });
  const [cookies, setCookie, removeCookie] = useCookies();
  const [notification, setnotification] = useState("");
  const [srcon, setsrcon] = useState(false);
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
    removeCookie("wwuser", { path: "/me" });
    setUser("");
  };

  const imgLink = (img) => {
    try {
      const imgname = JSON.parse(img);
      if (imgname.name) {
        return (
          <img
            src={`${process.env.REACT_APP_API}/img/link/${imgname.name}`}
            alt="avatar"
          />
        );
      } else {
        return <img src={require("../images/not-found.png")} alt="avatar" />;
      }
    } catch (error) {
      return <img src={require("../images/not-found.png")} alt="avatar" />;
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setnotification("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  const fileLink = (file) => {
    try {
      const filename = JSON.parse(file);
      if (filename.type.indexOf("image") > -1) {
        return (
          <img
            src={`${process.env.REACT_APP_API}/img/link/${filename.name}`}
            width={"100%"}
            alt="nombre"
          />
        );
      } else if(filename.type.indexOf("pdf") > -1) {
       
          return (
            <object
              width="100%"
              height="100%"
              type="application/pdf"
              data={`http://localhost:4000/img/link/${filename.name}?#zoom=85&scrollbar=0&toolbar=0&navpanes=0`}
            >
              <embed
                src={`${process.env.REACT_APP_API}/img/link/${filename.name}`}
                type="application/pdf"
              ></embed>
              <div className="width-100 flex-center-center padding-10">
                <p className="button-4 ">
                  Este browser no suporta pdf, <br />
                  descargarlo con el boton de arriba
                </p>
              </div>
            </object>
          );
        
      }else if(filename.type.indexOf("text") > -1) {
        const ReadTxt = async () => {
          try {
             await fetch(`${process.env.REACT_APP_API}/img/link/${filename.name}`)
            .then(res=> res.text())
            .then(content =>{settxt(content);})
          } catch (error) {
            console.error('Error al leer el archivo:', error);
            return '';
          }
        };
        
      
        ReadTxt();
        return <p className="txt-box">{txt}</p>
        
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        menuon,
        setMenuon,
        LogOut,
        errmsg,
        seterrmsg,
        notification,
        setnotification,
        fileLink,
        imgLink,
        srcon,
        setsrcon,
        refreshservice,
        setrefreshservice,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
