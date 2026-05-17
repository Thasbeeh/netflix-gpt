const MovieListShimmer = () => {
  return (
    <div id="shimmer" className="py-2 xs:py-3 md:py-4 animate-pulse">
      {/* Title Shimmer */}
      <div className="w-48 xs:w-64 h-8 xs:h-10 bg-gray-800 my-3 md:my-4 rounded-md"></div>

      {/* Cards Shimmer */}
      <div className="flex overflow-hidden gap-3 sm:gap-4 md:gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-28 xs:w-36 sm:w-44 md:w-48 lg:w-52 aspect-2/3 bg-gray-800/60 rounded-md md:rounded-lg shrink-0"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MovieListShimmer;
