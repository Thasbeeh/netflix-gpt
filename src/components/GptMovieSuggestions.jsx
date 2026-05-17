import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieListShimmer from "./MovieListShimmer";
import lang from "../utils/languageConstatnts";

const GptMovieSuggestions = () => {
  const { movieResults, isLoading } = useSelector((store) => store.gpt);
  const langKey = useSelector((store) => store.config.language);

  if (isLoading)
    return (
      <div className="w-full bg-black/80 text-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl">
        <MovieListShimmer />
      </div>
    );

  if (!movieResults || movieResults.length === 0) return null;

  return (
    <div className="w-full bg-black/80 text-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl">
      <MovieList title={lang[langKey].gptListTitle} movies={movieResults} />
    </div>
  );
};
export default GptMovieSuggestions;
