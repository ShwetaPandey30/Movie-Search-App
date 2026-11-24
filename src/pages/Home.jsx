import { useState, useEffect } from "react";

import {
  getTrendingMovies,
  searchMovies,
  getGenres
} from "../services/movieApi";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {

  // Movie states
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and genre states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Fetch trending movies
  useEffect(() => {

    const fetchMovies = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getTrendingMovies();

        setMovies(data);

      } catch (err) {

        console.error(err);
        setError("Unable to load movies. Please try again.");

      } finally {

        setLoading(false);

      }

    };

    fetchMovies();

  }, []);

  // Fetch available genres
  useEffect(() => {

    const fetchGenres = async () => {

      try {

        const data = await getGenres();

        setGenres(data);

      } catch (err) {

        console.error("Genre Error:", err);

      }

    };

    fetchGenres();

  }, []);

  // Search movies
  const handleSearch = async (query) => {

    try {

      setLoading(true);
      setError("");

      setSearchQuery(query);
      setSelectedGenre("");

      const data = await searchMovies(query);

      setMovies(data);

    } catch (err) {

      console.error(err);
      setError("Something went wrong while searching.");

    } finally {

      setLoading(false);

    }

  };

  // Filter movies by genre
  const handleGenreChange = async (genreId) => {

    try {

      setLoading(true);
      setError("");

      setSelectedGenre(genreId);
      setSearchQuery("");

      if (!genreId) {

        const data = await getTrendingMovies();

        setMovies(data);

      } else {

        const data = await getMoviesByGenre(genreId);

        setMovies(data);

      }

    } catch (err) {

      console.error(err);
      setError("Unable to filter movies.");

    } finally {

      setLoading(false);

    }

  };

  // Reset search and genre filter
  const handleReset = async () => {

    try {

      setLoading(true);
      setError("");

      setSearchQuery("");
      setSelectedGenre("");

      const data = await getTrendingMovies();

      setMovies(data);

    } catch (err) {

      console.error(err);
      setError("Unable to load trending movies.");

    } finally {

      setLoading(false);

    }

  };

  // Get selected genre name
  const selectedGenreName = genres.find(
    (genre) => genre.id.toString() === selectedGenre
  )?.name;

  return (

    <div className="home">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <p className="tagline">
            WELCOME TO CINESCOPE
          </p>

          <h1>
            Discover Movies.
            <br />
            Explore Stories.
          </h1>

          <p className="hero-description">
            Find your next favourite movie.
            Explore trending movies and discover
            amazing stories from around the world.
          </p>

        </div>

      </section>

      {/* Movie Section */}

      <section className="movie-section">

        {/* Search Bar */}

        <SearchBar onSearch={handleSearch} />

        {/* Genre Filter */}

        <div className="genre-filter">

          <button
            className={!selectedGenre ? "active" : ""}
            onClick={() => handleGenreChange("")}
          >
            All
          </button>

          {genres.map((genre) => (

            <button
              key={genre.id}
              className={
                selectedGenre === genre.id.toString()
                  ? "active"
                  : ""
              }
              onClick={() => handleGenreChange(genre.id.toString())}
            >
              {genre.name}
            </button>

          ))}

        </div>

        {/* Section Heading */}

        <div className="section-heading">

          <div>

            <h2>

              {searchQuery
                ? `Search Results: ${searchQuery}`
                : selectedGenreName
                  ? `${selectedGenreName} Movies`
                  : "Trending Movies"}

            </h2>

            <p>
              {searchQuery
                ? "Movies matching your search."
                : selectedGenreName
                  ? `Explore ${selectedGenreName} movies.`
                  : "Discover what everyone is watching."}
            </p>

          </div>

          {(searchQuery || selectedGenre) && (

            <button onClick={handleReset}>
              Clear Filters
            </button>

          )}

        </div>

        {/* Loading */}

        {loading && (

          <div className="loading-message">
            <div className="loader"></div>
            <p>Loading movies...</p>
          </div>

        )}

        {/* Error */}

        {!loading && error && (

          <div className="error-message">
            {error}
          </div>

        )}

        {/* No Results */}

        {!loading && !error && movies.length === 0 && (

          <div className="empty-message">
            <h3>No Movies Found!</h3>
            <p>Try searching for another movie or genre.</p>
          </div>

        )}

        {/* Movie Grid */}

        {!loading && !error && movies.length > 0 && (

          <div className="movie-grid">

            {movies.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </div>

        )}

      </section>

    </div>

  );

};

export default Home;