import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {

  const [watchlist, setWatchlist] = useState(() => {
    const savedMovies = localStorage.getItem("watchlist");

    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {

    setWatchlist((prev) => {

      const alreadyExists = prev.some(
        (item) => item.id === movie.id
      );

      if (alreadyExists) return prev;

      return [...prev, movie];

    });

  };

  const removeFromWatchlist = (id) => {

    setWatchlist((prev) =>
      prev.filter((movie) => movie.id !== id)
    );

  };

  const isInWatchlist = (id) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return (

    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist
      }}
    >

      {children}

    </WatchlistContext.Provider>

  );

};

export const useWatchlist = () => useContext(WatchlistContext);