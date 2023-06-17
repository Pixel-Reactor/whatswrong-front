import { useUser } from "../context/UserContext";
import Services from "./Services";
const Index = () => {
  const { user, menuon, setMenuon } = useUser();
  // console.log(user);
  return (
    <div className="home">
      <h1>Home Servicios</h1>
      <Services />
    </div>
  );
};

export default Index;
