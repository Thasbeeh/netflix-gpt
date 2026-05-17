import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useMovieSections from "../hooks/useMovieSections";
import { MOVIE_CATEGORIES } from "../utils/constants";
import MovieListShimmer from "./MovieListShimmer";
import { Container } from "./layout/Container";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  useMovieSections();

  return (
    <div className="bg-black w-full">
      <Container
        maxWidth="full"
        className="-mt-8 xs:-mt-32 sm:-mt-8 md:-mt-8 lg:-mt-30 xl:-mt-60 2xl:-mt-96 relative z-20 py-6"
      >
        {!movies ? (
          <MovieListShimmer />
        ) : (
          MOVIE_CATEGORIES.map((category) => {
            if (!movies[category.key].items) return

            return (
                <MovieList
                  key={category.key}
                  title={category.title}
                  movies={movies[category.key].items.slice(0, 20)}
                />
            )
          })
        )}
      </Container>
    </div>
  );
};
export default SecondaryContainer;
