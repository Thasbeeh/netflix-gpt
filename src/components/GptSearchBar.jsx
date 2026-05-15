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
    <div className="pt-[10%] w-full flex justify-center ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-2 w-2/3 bg-black flex justify-center rounded-2xl"
      >
        <input
          ref={searchRef}
          className="m-2 h-15 p-4 flex-1 bg-white rounded-lg"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="m-2 py-2 px-6 rounded-lg bg-red-500 text-white cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
