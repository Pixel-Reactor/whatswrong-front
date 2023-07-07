import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import userimg from "../images/user.png";
import logoutimg from "../images/logout.png";
import { IconPlus,IconLogout,IconUser } from "@tabler/icons-react";

const Minimenu = () => {
  const { menuon, setMenuon, user, LogOut } = useUser();
  //   console.log(user);

  const navigate = useNavigate();

  const [modal, setmodal] = useState({
    display: "block",
    position: "absolute",
    top: "100px",
    right: "10px",
    height: "260px",
    width: "200px",
    transition: "all 0.5s",
    overFlow: "hidden",
    opacity: "0",
    zIndex: "1000",
    border: "2px solid  rgba(128, 127, 127, 0.927)",
    borderRadius: "10px",
  });

  useEffect(() => {
    if (menuon === false) {
      setmodal({ ...modal, opacity: "1", top: "80px", zIndex: "10000" });
    } else {
      setmodal({ ...modal, zIndex: "-1", opacity: "0", top: "100px" });
    }
  }, [menuon]);
  return (
    !menuon && (
      <div style={modal}>
        <ul className="mini-menu flex-column-center">
          <li
            className="mini-menu-bio flex-center-center"
            onClick={() => {
              navigate("/me");
              setMenuon(!menuon);
            }}
          >
            {user.username}
          </li>
          <li
            className="button-4 flex-center-left width-100 "
            onClick={() => {
              navigate("/me");
              setMenuon(!menuon);
            }}
          >
          
            <p className="flex-center-left "> <IconUser width={'20px'}/> Ver Perfil</p>{" "}
          </li>

          <li
            className="button-4 flex-center-left width-100 "
            onClick={() => {
              navigate("/newservice");
              setMenuon(!menuon);
            }}
          >



           
            <p className="flex-center-left ">
              <IconPlus width={'20px'}/> Publicar</p>{" "}
          </li>
        

          <li
            className="mini-menu-li flex-center-left "
            onClick={() => {
              LogOut();
              setMenuon(true);
            }}
          >
          
            <div className="button-7 flex-center-center">
             
             <p className="flex-center-center"> <IconLogout />Cerrar session</p> 
            </div>
          </li>
        </ul>
      </div>
    )
  );
};

export default Minimenu;
