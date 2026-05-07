import { useEffect } from "react";
import api from "../utils/api";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    if (!movieId) return;

    try {
      const response = await api.get(`movies/${movieId}`);
      const trailer = response.data;
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  useEffect(() => {
    getMovieTrailer();
  }, [movieId]);
};

export default useMovieTrailer;
