import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Calendar,
  Clock,
  Heart,
  ArrowLeft,
  Play,
} from "lucide-react";

import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
} from "../services/movieApi";

import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useWatchlist();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          movieData,
          creditsData,
          videosData,
          similarData,
        ] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getSimilarMovies(id),
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        setSimilarMovies(similarData.results.slice(0, 10));

        const trailerData = videosData.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official
        );

        const fallbackTrailer = videosData.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        setTrailer(trailerData || fallbackTrailer || null);

      } catch (err) {
        console.error("Movie details error:", err);
        setError("Unable to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <div className="details-message">Loading movie details...</div>;
  }

  if (error || !movie) {
    return (
      <div className="details-message">
        <h2>{error || "Movie not found"}</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const saved = isInWatchlist(movie.id);

  const handleWatchlist = () => {
    if (saved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-details-page">

      {/* Backdrop */}
      <div
        className="details-backdrop"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
            : "none",
        }}
      />

      {/* Movie Information */}
      <div className="details-main">

        <img
          className="details-poster"
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={movie.title}
        />

        <div className="details-content">

          <h1>{movie.title}</h1>

          {movie.tagline && (
            <p className="details-tagline">{movie.tagline}</p>
          )}

          <div className="details-meta">
            <span>
              <Star size={17} fill="gold" color="gold" />
              {movie.vote_average?.toFixed(1)}/10
            </span>

            <span>
              <Calendar size={17} />
              {movie.release_date || "Release date unavailable"}
            </span>

            <span>
              <Clock size={17} />
              {movie.runtime ? `${movie.runtime} min` : "N/A"}
            </span>
          </div>

          <div className="details-genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <h3>Overview</h3>
          <p className="details-overview">
            {movie.overview || "No overview available."}
          </p>

          <button
            className="watchlist-button"
            onClick={handleWatchlist}
          >
            <Heart
              size={18}
              fill={saved ? "white" : "none"}
            />
            {saved ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>

          <Link to="/" className="back-home-button">
            <ArrowLeft size={18} />
            Back to Home
          </Link>

        </div>
      </div>

      {/* Trailer Section */}
      <section className="details-section">
        <h2>Official Trailer</h2>

        {trailer ? (
          <div className="trailer-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${movie.title} Official Trailer`}
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <p className="details-empty">
            No trailer available for this movie.
          </p>
        )}
      </section>

      {/* Cast Section */}
      <section className="details-section">
        <h2>Top Cast</h2>

        <div className="cast-grid">
          {cast.map((person) => (
            <div className="cast-card" key={person.id}>
              <img
                src={
                  person.profile_path
                    ? `${IMAGE_BASE_URL}${person.profile_path}`
                    : "https://placehold.co/200x250?text=No+Image"
                }
                alt={person.name}
              />

              <h4>{person.name}</h4>
              <p>{person.character || "Unknown role"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Movies */}
      <section className="details-section">
        <h2>Similar Movies</h2>

        {similarMovies.length > 0 ? (
          <div className="movie-grid">
            {similarMovies.map((similarMovie) => (
              <MovieCard
                key={similarMovie.id}
                movie={similarMovie}
              />
            ))}
          </div>
        ) : (
          <p className="details-empty">
            No similar movies available.
          </p>
        )}
      </section>

    </div>
  );
};

export default MovieDetails;