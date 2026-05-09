import { useEffect } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import {
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/movieSlice";

const useMovieSections = () => {
  const dispatch = useDispatch();

  const getMoviesSection = async () => {
    try {
      const response = await api.get("movies/sections");
      dispatch(addUpcomingMovies(response.data.upcomingMovies));
      dispatch(addTopRatedMovies(response.data.topRatedMovies));
      dispatch(addPopularMovies(response.data.popularMovies));
    } catch (error) {
      console.log(
        "Failed to fetech movies section",
        error.response?.data?.message,
      );
    }
  };

  useEffect(() => {
    getMoviesSection();
  }, []);
};

export default useMovieSections;
