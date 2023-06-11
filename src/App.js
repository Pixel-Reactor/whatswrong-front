import './App.css';
import {Routes, Route } from "react-router-dom";
import { Handler } from "./context/Context";
import { Test } from './Api/Api';
import { useEffect } from 'react';
import Header from './components/Header';
import Index from './components/Index';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Services from './components/Services';
import Footer from './components/Footer';
function App() {
  const {test,settest} = Handler();

  const DataTest = async()=>{
    //test de conexion con la base de datos
    const response = await Test();
    console.log(response)
  }
  useEffect(() => {
    DataTest();
  }, []);

  return (
    <div className="App">
    <Header />
    <div className="container"> 
    <Routes>
    <Route path={'/'} element={<Index />} />
    <Route path={'/signin'} element={<SignIn />} />
    <Route path={'/signup'} element={<Signup />} />
    <Route path={'/services'} element={<Services />} />

    </Routes></div>
   
    <Footer />

    </div>
  );
}

export default App;
