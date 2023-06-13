import React, { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Login } from "../Api/Api";

const SignIn = () => {
  const [user,setUser,setLocalStorage] = useUser();
  const [data, setdata] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Login(data);
      console.log(res)
      if(res.data.status === 'ok'){
        console.log(res.data)
        setUser({
          token:res.data.token,
          username:res.data.username
        })
        console.log(user);
        setLocalStorage({
          token:res.data.token,
          username:res.data.username
        })
        navigate('/')
      }
      
    } catch (error) {
     console.log(error)
     setError(error.response.data.message)
    }
    
  };
  const  handleChange = (e)=>{
    e.preventDefault();
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })

  }
useEffect(() => {
  if (user) {
   navigate('/')
  }
}, [user]);
  

  return (
    <div className="signup-section">
      <h1>Login</h1>
       <form onSubmit={handleSubmit} className="signup-form">
       <div className="form-item">
          <input
          onChange={handleChange}
          name="email"
          autoComplete="off"
          required
        />
        <label htmlFor="email">Correo</label>

        </div>
     
      
    
      <div className="form-item"> 
       <input
          name="pwd"
          type="password"
          onChange={handleChange}
          autoComplete="off"
          required
          
        />
       <label htmlFor="email">Password</label>
</div>
   
      
     
      <button>Entrar</button>
      {error && <p className="error-mod">{error}</p>}
    </form>
    </div>
   
  );
};

export default SignIn;
