import { Link } from "react-router-dom";
import { Film, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2><Film size={22} /> CineScope</h2>

        <p>Discover movies. Explore stories. Find your next favourite.</p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/watchlist">My Watchlist</Link>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
            TMDB
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} CineScope. Built with React.
        </p>

        <p className="tmdb-notice">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;