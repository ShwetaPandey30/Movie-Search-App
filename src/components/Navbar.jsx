import React from "react";
import { Link } from "react-router-dom";
import { Film, Heart, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        <Film size={28} />
        <h2>CineScope</h2>
      </div>

      <div className="nav-links">
        <Link to="/">
          <Home size={18} /> Home
        </Link>

        <Link to="/watchlist">
          <Heart size={18} /> Watchlist
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;