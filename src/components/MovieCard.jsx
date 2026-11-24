import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {

  return (

    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
    >

      <img
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "https://placehold.co/300x450?text=No+Poster"
        }
        alt={movie.title}
      />

      <div className="movie-info">

        <h3>{movie.title}</h3>

        <div className="movie-meta">

          <span>
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </span>

          <span>
            {movie.release_date?.slice(0, 4) || "Unknown"}
          </span>

        </div>

      </div>

    </Link>

  );

};

export default MovieCard;