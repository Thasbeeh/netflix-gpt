import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import api from "../utils/api";

const useNowPlayingMoviesData = () => {
  const dispatch = useDispatch();

  const getNowPlayingMoviesData = async () => {
    const response = await api.get("/movies");
    dispatch(addNowPlayingMovies(response.data));
  };

  useEffect(() => {
    getNowPlayingMoviesData();
  }, []);
};

export default useNowPlayingMoviesData;
