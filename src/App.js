import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import Index from "./components/Index";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import { NewService } from "./components/NewService";
import Services from "./components/Services";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";
import Bio from "./components/Bio";
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path={"/"} element={<Index />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/biografia/:id"} element={<Bio />} />
        <Route path={"/me"} element={<Bio />} />
        <Route path={"/newservice"} element={<NewService />} />
      </Routes>
      <ErrorMessage />
      <Footer />
    </div>
  );
}

export default App;
