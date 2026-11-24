import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {

  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (

    <div className="movie-section">

      <h1>My Watchlist ❤️</h1>

      <p>Your favourite movies in one place.</p>

      {watchlist.length === 0 ? (

        <p className="empty-message">
          Your watchlist is empty. Start adding movies!
        </p>

      ) : (

        <div className="movie-grid">

          {watchlist.map((movie) => (

            <div key={movie.id}>

              <MovieCard movie={movie} />

              <button
                className="remove-btn"
                onClick={() => removeFromWatchlist(movie.id)}
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Watchlist;