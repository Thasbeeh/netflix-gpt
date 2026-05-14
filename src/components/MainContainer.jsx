import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies?.items);
  const mainMovie = movies[0];

  useNowPlayingMovies();

  if (!mainMovie) return;

  const { original_title, overview, id } = mainMovie;
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle original_title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;
