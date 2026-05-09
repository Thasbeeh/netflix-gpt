import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import api from "../utils/api";

const useNowPlayingMoviesData = () => {
  const dispatch = useDispatch();

  const getNowPlayingMoviesData = async () => {
    try {
      const response = await api.get("/movies/main");
      dispatch(addNowPlayingMovies(response.data?.nowPlayingMovies));
      dispatch(addTrailerVideo(response.data?.trailerVideo));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNowPlayingMoviesData();
  }, []);
};

export default useNowPlayingMoviesData;
