import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const { user, menuon, setMenuon, imgLink } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex-center-center">
      <article
        className={user.username ? "header-show-user" : "header-sign-user"}
      >
        {user.username ? (
          <div
            className="flex-center-center header_show_user  pointer"
            onClick={() => navigate("/me")}
          >
            {imgLink(user.avatar)}
          </div>
        ) : (
          <div className="header_show_sign pointer">
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
          </div>
        )}
      </article>
      {user.token ? (
        <div
          className={`${
            menuon ? "menuoff" : "menuon"
          } flex-column-center pointer`}
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
