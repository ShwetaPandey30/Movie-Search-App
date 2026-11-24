import { Film } from "lucide-react";

const EmptyState = ({ message = "No movies found!" }) => {
  return (
    <div className="empty-state">
      <Film size={55} />

      <h2>{message}</h2>

      <p>Try searching with a different movie name.</p>
    </div>
  );
};

export default EmptyState;