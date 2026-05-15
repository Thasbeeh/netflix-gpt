import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieListShimmer from "./MovieListShimmer";
import lang from "../utils/languageConstatnts";

const GptMovieSuggestions = () => {
  const { movieResults, isLoading } = useSelector((store) => store.gpt);
  const langKey = useSelector((store) => store.config.language);

  if (isLoading)
    return (
      <div className="bg-black text-white px-4 pt-8 pb-16 mt-40">
        <MovieListShimmer />
      </div>
    );

  if (!movieResults || movieResults.length === 0) return;

  return (
    <div className="p-4 px-15 bg-black/80 text-white pb-16 mt-40">
      <MovieList title={lang[langKey].gptListTitle} movies={movieResults} />
    </div>
  );
};
export default GptMovieSuggestions;
