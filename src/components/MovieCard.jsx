import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, posterPath }) => {
  return (
    <div className="w-60 pr-6">
      <img
        className="rounded-lg"
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};
export default MovieCard;
