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
      className="w-full bg-black p-2 sm:p-4 flex flex-col sm:flex-row justify-center rounded-2xl gap-2 sm:gap-4"
    >
      <input
        ref={searchRef}
        className="flex-1 h-12 sm:h-14 px-4 bg-white rounded-lg text-sm xs:text-base outline-none text-black"
        type="text"
        placeholder={lang[langKey].gptSearchPlaceholder}
      />
      <button
        className="h-12 sm:h-14 px-6 sm:px-8 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer text-sm xs:text-base font-semibold transition-colors flex-shrink-0"
        onClick={handleGptSearchClick}
      >
        {lang[langKey].search}
      </button>
    </form>
  );
};
export default GptSearchBar;
