import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import userimg from "../images/user.png";
import logoutimg from "../images/logout.png";

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
    border: "2px solid black",
    borderRadius: "10px",
  });

  useEffect(() => {
    // console.log(menuon);
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
            className="mini-menu-li flex-center-left "
            onClick={() => {
              navigate("/me");
              setMenuon(!menuon);
            }}
          >
            <img src={userimg} alt="" width={"25px"} />
            <p className="mg10"> Ver Perfil</p>{" "}
          </li>
          <li
            className="mini-menu-li flex-center-left "
            onClick={() => {
              navigate("/");
              setMenuon(!menuon);
            }}
          >
            <img src={userimg} alt="" width={"25px"} />
            <p className="mg10"> Home</p>{" "}
          </li>
          <li
            className="mini-menu-li flex-center-left "
            onClick={() => {
              navigate("/newservice");
              setMenuon(!menuon);
            }}
          >
            <img src={userimg} alt="" width={"25px"} />
            <p className="mg10"> New service</p>{" "}
          </li>
          <li
            className="mini-menu-li flex-center-left "
            onClick={() => {
              LogOut();
              setMenuon(true);
            }}
          >
            <img src={logoutimg} alt="" width={"25px"} />
            <p className="button-small-red flex-center-center">
              {" "}
              Cerrar session
            </p>{" "}
          </li>
        </ul>
      </div>
    )
  );
};

export default Minimenu;
