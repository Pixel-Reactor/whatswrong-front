import { useUser } from "../context/UserContext";
import Services from "./Services";
const Index = () => {
  const {  setMenuon,setsrcon } = useUser();
  // console.log(user);
  return (
    <div className="home" onClick={()=>{setMenuon(true);setsrcon(false)}}>
      <Services />
    </div>
  );
};

export default Index;
