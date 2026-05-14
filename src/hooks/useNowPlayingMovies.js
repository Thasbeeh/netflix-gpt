import { useDispatch, useSelector } from "react-redux";
import {
  fetchFailed,
  fetchSucceeded,
  setTrailerVideo,
} from "../utils/movieSlice";
import { useEffect } from "react";
import api from "../utils/api";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movie?.nowPlayingMovies?.items);

  const getHomePageMovies = async () => {
    try {
      const response = await api.get(`/movies/main?page=1`);
      dispatch(
        fetchSucceeded({
          page: 1,
          category: "nowPlayingMovies",
          items: response.data?.nowPlayingMovies?.results,
          totalPages: response.data.nowPlayingMovies?.totalPages,
        }),
      );
      dispatch(setTrailerVideo(response.data?.trailerVideo));
    } catch (error) {
      console.log(error);
      dispatch(
        fetchFailed({
          category: "nowPlayingMovies",
          error: error.message || "Failed to fetch movies",
        }),
      );
    }
  };

  useEffect(() => {
    if (movies.length === 0) getHomePageMovies();
  }, []);
};

export default useNowPlayingMovies;
