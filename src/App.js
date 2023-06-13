import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./components/Index";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Services from "./components/Services";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="app">
 <Header />
       <Routes>
       <Route path={"/"} element={<Index />} />
       <Route path={"/signin"} element={<SignIn />} />
       <Route path={"/signup"} element={<Signup />} />
       
     
    </Routes>
    <Footer />
    </div>
   
  );
}

export default App;
