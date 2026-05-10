import { useSelector } from "react-redux";
import lang from "../utils/languageConstatnts";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.language);

  return (
    <div className="pt-[10%] w-full flex justify-center ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-2 w-2/3 bg-black flex justify-center rounded-2xl"
      >
        <input
          className="m-2 p-4 flex-1 bg-white rounded-lg"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="m-2 py-2 px-6 rounded-lg bg-red-500 text-white">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
