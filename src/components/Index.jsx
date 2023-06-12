import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Index.css";

const Index = () => {
  return (
    <div className="index">
      <Header />
      <main className="index_main">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
