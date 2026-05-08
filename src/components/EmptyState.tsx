import { Link } from "react-router";

export const EmptyState = () => (
  <div className="text-center py-16 px-4">
    <div className="text-6xl mb-4">🎮</div>
    <h3 className="text-2xl font-bold mb-2">No games found</h3>
    <p className="text-base-content/70 mb-6">
      Your backlog is looking a little empty.
    </p>
    <Link to="/games/add" className="btn btn-primary">
      Add a Game
    </Link>
  </div>
);
