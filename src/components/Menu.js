import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const { user, menuon, setMenuon } = useUser();
  // console.log(user);
  return (
    <div className="flex-center-center">
      <article className="header-sign-user">
        {user.username ? (
          <div className="flex-center-center header_show_user ">
            {" "}
            <img src={`http://localhost:4000/img/link/${user.avatar}`} alt="avatar" width={'30px'} />
            <p>{user.username}</p>
          </div>
        ) : (
          <>
            {" "}
            <button
              className="button-orange"
              type="button"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
            <button
              className="button-green"
              type="button"
              onClick={() => navigate("/signin")}
            >
              Login
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
