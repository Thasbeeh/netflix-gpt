import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-34 xs:w-36 sm:w-44 md:w-48 lg:w-52 shrink-0">
      <img
        className="w-full h-auto rounded-md md:rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-black/50 cursor-pointer transition-all duration-300 ease-out"
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};
export default MovieCard;
