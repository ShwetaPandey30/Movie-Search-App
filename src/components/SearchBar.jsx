import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Search your favourite movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">
        <Search size={20} />
        Search
      </button>

    </form>
  );
};

export default SearchBar;