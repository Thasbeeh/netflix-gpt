import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies?.items);

  useNowPlayingMovies();

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  
  return (
    <div className="w-full overflow-hidden relative bg-black">
      <VideoTitle original_title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;
