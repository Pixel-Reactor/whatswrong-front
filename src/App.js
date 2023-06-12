import "./App.css";
import { Routes, Route } from "react-router-dom";

import Index from "./components/Index";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Services from "./components/Services";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Index />}>
        <Route index element={<Services />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
