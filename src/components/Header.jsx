import { useDispatch, useSelector } from "react-redux";
import { useAuthActions } from "../hooks/useAuthActions";
import { AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { setLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { logout } = useAuthActions();

  const handleSignOut = () => logout();
  const handleGptSearchClick = () => dispatch(toggleGptSearchView());
  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-linear-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <div>
        <img className="w-80 px-8 py-2" src={LOGO} alt="logo"></img>
      </div>
      {user && (
        <div className="flex items-center gap-4 p-2 rounded-lg w-fit">
          {showGptSearch && (
            <select
              className="p-2 h-10 text-white font-semibold rounded-lg bg-gray-700"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="w-40 h-10 text-white font-semibold rounded-lg bg-green-500"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 rounded-md border border-gray-600 object-cover"
            alt="user-avatar"
            src={user?.photoUrl ?? AVATAR}
          />
          <button
            className="text-sm font-semibold text-white hover:text-red-500 transition-colors duration-200"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
