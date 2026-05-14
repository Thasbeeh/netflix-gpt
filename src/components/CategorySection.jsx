import { useSelector } from "react-redux";
import { useRef } from "react";
import MovieCard from "./MovieCard";
import useMovieScroll from "../hooks/useMovieScroll";

const CategorySection = ({ title, category, apiEndPoint }) => {
  const sentinelRef = useRef(null);
  const movies = useSelector((store) => store.movie[category]);

  useMovieScroll(sentinelRef, movies, category, apiEndPoint);

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 px-4 md:px-12 relative">
      <div className="relative z-30 pt-[2%] px-6">
        <h2 className="text-red-700 text-5xl font-semibold flex justify-center">
          {title}
        </h2>

        <div className="flex cursor-pointer flex-wrap gap-20 pt-[3%] justify-center">
          {movies.items.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
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
