import { useSelector } from "react-redux";
import { useAuthActions } from "../hooks/useAuthActions";
import { AVATAR, LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.auth.user);
  const { logout } = useAuthActions();

  const handleClick = () => logout();

  return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <div>
        <img className="w-80 px-8 py-2" src={LOGO} alt="logo"></img>
      </div>
      {user && (
        <div className="flex items-center gap-4 p-2 rounded-lg w-fit">
          <img
            className="w-10 h-10 rounded-md border border-gray-600 object-cover"
            alt="user-avatar"
            src={user?.photoUrl ?? AVATAR}
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
