import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../utils/api";
import { fetchStarted, fetchSucceeded, fetchFailed } from "../utils/movieSlice";

const useMovieScroll = (sentinelRef, movies, category, apiEndPoint) => {
  const dispatch = useDispatch();

  const { currentPage, isLoading, hasMore } = movies;

  useEffect(() => {
    const target = sentinelRef.current;

    if (!target || isLoading || !hasMore) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const nextPage = currentPage + 1;

      dispatch(fetchStarted({ category }));

      try {
        const response = await api.get(
          `/movies/${apiEndPoint}?page=${nextPage}`,
        );

        dispatch(
          fetchSucceeded({
            category,
            page: nextPage,
            items: response.data.results,
            totalPages: response.data.totalPages,
          }),
        );
      } catch (error) {
        dispatch(
          fetchFailed({
            category,
            error: error.message || "Failed to fetch movies",
          }),
        );
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [
    dispatch,
    sentinelRef,
    category,
    apiEndPoint,
    currentPage,
    isLoading,
    hasMore,
  ]);
};

export default useMovieScroll;
