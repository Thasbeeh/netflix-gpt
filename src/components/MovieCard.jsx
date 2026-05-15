import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, posterPath }) => {
  if (!posterPath) return;

  return (
    <div className="w-60 pr-6">
      <img
        className="rounded-lg hover:scale-110 cursor-pointer"
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};
export default MovieCard;
