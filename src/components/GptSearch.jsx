import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60" />
        <img
          className="h-full w-full object-cover"
          alt="login-page-background"
          src={BG_URL}
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};
export default GptSearch;
