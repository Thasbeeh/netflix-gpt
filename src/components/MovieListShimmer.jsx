const MovieListShimmer = () => {
  return (
    <div id="shimmer" className="px-6">
      <div className="w-80 h-15 py-6 bg-gray-700 mb-10 rounded-lg animate-pulse"></div>
      <div className="flex gap-16 animate-pulse">
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
        <div className="w-60 h-80 pr-6 bg-gray-800 shrink-0 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MovieListShimmer;
