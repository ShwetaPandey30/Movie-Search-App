import axios from "axios";

// TMDB API configuration
const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
});

// 1. Get Trending Movies
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await API.get("/trending/movie/week", {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// 2. Search Movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await API.get("/search/movie", {
      params: {
        query,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// 3. Get Movie Genres
export const getGenres = async () => {
  try {
    const response = await API.get("/genre/movie/list");

    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// 4. Get Movies by Genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await API.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// 5. Get Movie Details
export const getMovieDetails = async (id) => {
  try {
    const response = await API.get(`/movie/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// 6. Get Movie Cast and Crew
export const getMovieCredits = async (id) => {
  try {
    const response = await API.get(`/movie/${id}/credits`);

    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// 7. Get Similar Movies
export const getSimilarMovies = async (id, page = 1) => {
  try {
    const response = await API.get(`/movie/${id}/similar`, {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};

// 8. Get Movie Videos (Trailers)
export const getMovieVideos = async (id) => {
  try {
    const response = await API.get(`/movie/${id}/videos`);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

// Export Axios instance
export default API;