import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  IconSearch,
  IconChecks,
  IconCaretUp,
  IconCaretDown,
  IconBulb,
} from "@tabler/icons-react";
import Menu from "./Menu";
import Minimenu from "./Minimenu";
import { Search } from "../Api/Api";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { srcon, setsrcon } = useUser();
  const [srctxt, setsrctxt] = useState({ text: "" });
  const [wait, setwait] = useState(false);
  const [srcresult, setsrcresult] = useState([]);
  useEffect(() => {
    const SrcService = async () => {
      setwait(true);
      try {
        const res = await Search(srctxt);
        if (res) {
          setwait(false);
          setsrcresult(res.data);
          // console.log(res.data)
        }
      } catch (error) {
        setwait(false);
      }
    };
    if (!wait && srctxt.text) {
      SrcService();
    } else {
      return;
    }
  }, [srctxt]);
  return (
    <div className="header border-radius">
      <article
        className="logo-small flex-center-center"
        onClick={() => navigate("/")}
      >
        <div className="logo-box flex-center-center">
          <IconBulb
            color="white"
            width={"100%"}
            height={"100%"}
            strokeWidth={"1.0"}
          />
        </div>
      </article>
      <article
        className="logo  flex-center-left pointer"
        onClick={() => navigate("/")}
      >
        <div className="logo-box  flex-center-center">
          <IconBulb
            color="white"
            width={"100%"}
            height={"100%"}
            strokeWidth={"1.0"}
          />
        </div>
        <p className="width-100 flex-center-center">What´s Wrong</p>
      </article>

      <article className="search-bar-container flex-center-center">
        <div className="search-bar-box flex-center-center">
          <div className="search-bar-icon flex-center-center">
            <IconSearch width={"20px"} strokeWidth={"1"} />
          </div>
          <input
            type="text"
            name="search"
            placeholder="Buscar..."
            onChange={(e) => setsrctxt({ text: e.target.value })}
            onBlur={() => {
              setsrctxt({ text: "" });
            }}
            onFocus={() => setsrcon(true)}
          />
          {srcon ? (
            <IconCaretUp strokeWidth={"1.0"} onClick={() => setsrcon(false)} />
          ) : (
            <IconCaretDown strokeWidth={"1.0"} />
          )}
        </div>
        <div
          style={{ display: srcon ? "flex" : "none" }}
          className="search-result"
        >
          <ul>
            {srcresult.length ? (
              srcresult.map((item) => (
                <li
                  key={item.idservicios}
                  className="flex-center-left"
                  onClick={() => {
                    navigate(`/service/${item.idservicios}`);
                    setsrcon(false);
                  }}
                >
                  {item.titulo}
                </li>
              ))
            ) : (
              <li className="flex-center-left">
                <p>...</p>
              </li>
            )}
          </ul>
        </div>
      </article>

      <article>
        <Menu />
        <Minimenu />
      </article>
    </div>
  );
};

export default Header;
