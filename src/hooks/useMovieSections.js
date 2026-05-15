import { useEffect } from "react";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchSucceeded } from "../utils/movieSlice";

const useMovieSections = () => {
  const dispatch = useDispatch();
  const { upcomingMovies, popularMovies, topRatedMovies } = useSelector(
    (store) => store.movie,
  );

  const getMoviesSection = async () => {
    try {
      const response = await api.get("movies/sections");
      const movieSections = [
        "upcomingMovies",
        "topRatedMovies",
        "popularMovies",
      ];

      movieSections.map((category) =>
        dispatch(
          fetchSucceeded({
            page: 1,
            category: category,
            items: response.data?.[category]?.results,
            totalPages: response.data?.[category]?.totalPages,
          }),
        ),
      );
    } catch (error) {
      console.log("Failed to fetch movies section", error);
    }
  };

  useEffect(() => {
    if (
      !(
        upcomingMovies.initialized &&
        popularMovies.initialized &&
        topRatedMovies.initialized
      )
    ) {
      getMoviesSection();
    }
  }, []);
};

export default useMovieSections;
