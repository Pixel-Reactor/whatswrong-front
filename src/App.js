import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./components/Index";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import { NewService } from "./components/NewService";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";
import Bio from "./components/Bio";
import Service from "./components/Service";
import Notification from "./components/Notification";
import BioById from "./components/BioById";
import { Privados } from "./components/Privados";

function App() {
  return (
    <div className="app flex-column-center">
      <Header />
      <main className="home">
        <Routes>
          <Route path={"/"} element={<Index />} />
          <Route path={"/signin"} element={<SignIn />} />
          <Route path={"/signup"} element={<Signup />} />

          <Route path={"/me"} element={<Bio />} />
          <Route path={"/usuario/:byId"} element={<BioById />} />
          <Route path={"/newservice"} element={<NewService />} />
          <Route path={"/service/:id"} element={<Service />} />
          <Route path={"/privados/:id"} element={<Privados />} />
          <Route path={"*"} element={<Index />} />
        </Routes>
      </main>
      <Notification />
      <ErrorMessage />
      <Footer />
    </div>
  );
}

export default App;
