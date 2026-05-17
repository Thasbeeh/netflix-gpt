import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="py-2 xs:py-3 md:py-4">
      <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-white py-3 md:py-4">
        {title}
      </h3>
      <div className="flex overflow-x-auto scrollbar-none">
        <div className="flex gap-3 sm:gap-4 md:gap-6 pr-3 sm:pr-4 md:pr-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
