import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const { user, menuon, setMenuon } = useUser();
  const navigate = useNavigate();
  const imgLink = (img) =>{
    try {
      const imgname = JSON.parse(img);
      return imgname.name
   } catch (error) {
      return 'not-found.png'
   }
   
  }
  return (
    <div className="flex-center-center">
      <article className="header-sign-user">
        {user.username ? (
          <div className="flex-center-center header_show_user ">
          
            <img className="bio_img"
              src={`http://localhost:4000/img/link/${imgLink(user.avatar)}`}
              alt="avatar"
              width={"30px"}
            />
            <p>{user.username}</p>
          </div>
        ) : (
          <>
            {" "}
            <button
              className="button-4"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="button-3"
              type="button"
              onClick={() => navigate("/signin")}
            >
              Log in
            </button>
          </>
        )}
      </article>
      {user.token ? (
        <div
          className={`${menuon ? "menuoff" : "menuon"} flex-column-center`}
          onClick={() => (menuon ? setMenuon(false) : setMenuon(true))}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Menu;
