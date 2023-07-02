import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import infoimg from "../images/info.png";
import errimg from "../images/close.png";
const ErrorMessage = () => {
  const {errmsg, seterrmsg } = useUser();

  const [display, setdisplay] = useState({ display: "none" });
  useEffect(() => {
    errmsg.on
      ? setdisplay({ display: "flex" })
      : setdisplay({ display: "none" });
  }, [errmsg]);
  return (
    <div style={display} onClick={() => seterrmsg({ on: false })}>
      <p className="error-mod flex-center-around">
        <img src={infoimg} alt="info" width="20px" />
        {errmsg.message}
        <img src={errimg} alt="info" width="20px" />
      </p>
    </div>
  );
};

export default ErrorMessage;
