import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {  IconSearch } from "@tabler/icons-react";
import Menu from "./Menu";
import Minimenu from "./Minimenu";
import logo from "../images/logo.png";
import logosmall from '../images/solution.png'
import { Search } from "../Api/Api";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const {srcon,setsrcon} = useUser();
  const [srctxt, setsrctxt] = useState('');
  const [wait, setwait] = useState(false);
  const [srcresult, setsrcresult] = useState([]);
  useEffect(() => {
    const SrcService = async () =>{
      setwait(true);
      try {
        const res =await Search(srctxt);
        if(res){
          setwait(false);
          setsrcresult(res.data);
        }
       } catch (error) {
        setwait(false)
       }
    }
    if(!wait && srctxt){
      SrcService();
    }else{
      return
    }
   
   
  }, [srctxt]);
  return (
    <div className="header">
      <article className="logo-small flex-center-center" onClick={()=>navigate('/')}>
        <img src={logosmall} alt="logo" ></img>
      </article>
      <article className="logo flex-center-center" onClick={()=>navigate('/')}>
        <img src={logo} alt="logo"></img>
      </article>


      <article className="search-bar-container flex-center-center">
       
        <div className="search-bar-box flex-center-center">
          <div className="search-bar-icon flex-center-center">
            <IconSearch width={'20px'} strokeWidth={'1'} />
          </div>
          <input type="text" name="search" placeholder="Buscar..." onChange={(e)=>setsrctxt({text:e.target.value})} onBlur={()=>{ setsrctxt('')}} onFocus={()=>setsrcon(true)} />
        </div>
      <div style={{display:srcon? 'flex' : 'none'}} className="search-result">
        <ul>
        {srcresult? srcresult.map(item=>
        <li key={item.idservicios} className="flex-center-left" onClick={() =>
         {navigate(`/service/${item.idservicios}`);setsrcon(false)}}>{item.titulo}</li>) : 'no se ha encontrado'}

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
