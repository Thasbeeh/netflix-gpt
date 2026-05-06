import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAccessToken } from "../utils/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleClick = () => logout();
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(removeUser());
      dispatch(clearAccessToken());
      navigate("/");
    } catch {
      navigate("/error");
    }
  };

  return (
    <div className="absolute w-screen bg-linear-to-b from-black flex justify-between">
      <div>
        <img
          className="w-80 px-8 py-2"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-04-27/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        ></img>
      </div>
      {user && (
        <div className="flex items-center gap-4 p-2 rounded-lg w-fit">
          <img
            className="w-10 h-10 rounded-md border border-gray-600 object-cover"
            alt="user-avatar"
            src={
              user?.photoUrl ??
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
          />
          <button
            className="text-sm font-semibold text-white hover:text-red-500 transition-colors duration-200"
            onClick={handleClick}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
