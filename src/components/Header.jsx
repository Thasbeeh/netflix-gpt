import { useDispatch, useSelector } from "react-redux";
import { useAuthActions } from "../hooks/useAuthActions";
import {
  AVATAR,
  LOGO,
  MOVIE_CATEGORIES,
  SUPPORTED_LANGUAGES,
} from "../utils/constants";
import { setGptSearchView, toggleGptSearchView } from "../utils/gptSlice";
import { setLanguage } from "../utils/configSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "./layout/Container";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.language);
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => logout();
  const handleGptSearchClick = () => {
    if (showGptSearch) {
      navigate(location.state?.from || "/browse");
    } else {
      navigate("/gpt-search", {
        state: { from: location.pathname },
      });
    }
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => dispatch(setLanguage(e.target.value));

  useEffect(() => {
    dispatch(setGptSearchView(location.pathname === "/gpt-search"));
  }, [location.pathname, dispatch]);

  return (
    <Container
      as="header"
      maxWidth="full"
      className="relative lg:absolute lg:top-0 lg:left-0 z-50 py-4 lg:bg-linear-to-b lg:from-black/80 lg:via-transparent flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0"
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full lg:w-auto">
        <img className="w-36 xs:w-44 md:w-48 xl:w-56" src={LOGO} alt="logo" />
        {user && (
          <nav className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 md:gap-6 text-sm xs:text-base md:text-lg font-medium">
            <Link
              to="/"
              className="text-white hover:text-red-500 transition-colors"
            >
              Home
            </Link>
            {MOVIE_CATEGORIES.map((category) => (
              <Link
                className="text-white hover:text-red-500 transition-colors"
                to={`/browse/${category.apiEndPoint}`}
                key={category.key}
              >
                {category.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
      {user && (
        <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 lg:justify-end w-full lg:w-auto">
          {showGptSearch && (
            <select
              className="p-1.5 md:p-2 h-9 md:h-10 text-white text-xs xs:text-sm md:text-base font-semibold rounded-lg bg-gray-800/90 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors border border-gray-600"
              onChange={handleLanguageChange}
              value={langKey}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="bg-gray-800"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-3 xs:px-4 h-9 md:h-10 text-white text-xs xs:text-sm md:text-base font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Exit Search" : "GPT Search"}
          </button>
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-md border border-gray-600 object-cover"
            alt="user-avatar"
            src={user?.photoUrl ?? AVATAR}
          />
          <button
            className="text-xs xs:text-sm md:text-base font-semibold text-white hover:text-red-500 transition-colors duration-200"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </Container>
  );
};
export default Header;
