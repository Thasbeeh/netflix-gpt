import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useMovieSections from "../hooks/useMovieSections";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  useMovieSections();

  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-107 relative z-2 px-17 py-6">
          {movies.nowPlayingMovies && (
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          )}
          {movies.upcomingMovies && (
            <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
          )}
          {movies.topRatedMovies && (
            <MovieList title={"Top Trending"} movies={movies.topRatedMovies} />
          )}
          {movies.popularMovies && (
            <MovieList title={"Popular"} movies={movies.popularMovies} />
          )}
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
