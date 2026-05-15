import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useMovieSections from "../hooks/useMovieSections";
import { MOVIE_CATEGORIES } from "../utils/constants";
import MovieListShimmer from "./MovieListShimmer";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  useMovieSections();

  return (
    <div className="bg-black">
      <div className="-mt-107 relative z-2 px-17 py-6">
        {!movies ? (
          <MovieListShimmer />
        ) : (
          MOVIE_CATEGORIES.map((category) => {
            return (
              movies[category.key].items.length > 0 && (
                <MovieList
                  title={category.title}
                  movies={movies[category.key].items.slice(0, 20)}
                />
              )
            );
          })
        )}
      </div>
    </div>
  );
};
export default SecondaryContainer;
