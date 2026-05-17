import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstatnts";
import { useRef } from "react";
import api from "../utils/api";
import {
  clearGptMoviesResult,
  setGptLoading,
  gptMoviesResult,
} from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.language);
  const searchRef = useRef(null);

  const handleGptSearchClick = async () => {
    dispatch(setGptLoading());
    dispatch(clearGptMoviesResult());

    try {
      const response = await api.post("/ai", {
        content: searchRef.current.value,
      });
      dispatch(gptMoviesResult(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setGptLoading());
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full bg-black p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center rounded-2xl gap-3 sm:gap-4"
    >
      <input
        ref={searchRef}
        className="w-full sm:w-auto flex-1 min-h-12 sm:min-h-14 h-12 sm:h-14 px-4 bg-white rounded-lg text-sm xs:text-base outline-none text-black"
        type="text"
        placeholder={lang[langKey].gptSearchPlaceholder}
      />
      <button
        className="w-full sm:w-auto min-h-12 sm:min-h-14 h-12 sm:h-14 px-6 sm:px-8 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer text-sm xs:text-base font-semibold transition-colors flex-shrink-0"
        onClick={handleGptSearchClick}
      >
        {lang[langKey].search}
      </button>
    </form>
  );
};
export default GptSearchBar;
