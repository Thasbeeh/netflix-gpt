import { useSelector } from "react-redux";
import { useRef } from "react";
import MovieCard from "./MovieCard";
import useMovieScroll from "../hooks/useMovieScroll";
import { Container } from "./layout/Container";

const CategorySection = ({ title, category, apiEndPoint }) => {
  const sentinelRef = useRef(null);
  const movies = useSelector((store) => store.movie[category]);

  useMovieScroll(sentinelRef, movies, category, apiEndPoint);

  return (
    <div className="min-h-screen bg-black lg:pt-24 relative">
      <Container maxWidth="full" className="relative z-10 pt-6">
        <h2 className="text-red-700 text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold flex justify-center text-center">
          {title}
        </h2>

        <div className="flex flex-wrap justify-center pt-8 gap-x-12 gap-y-6 md:gap-y-8">
          {movies.items.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </Container>
      {movies.hasMore && (
        <div
          ref={sentinelRef}
          className="h-20 w-full flex items-center justify-center"
        >
          {movies.isLoading && (
            <div className="w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};
export default CategorySection;
