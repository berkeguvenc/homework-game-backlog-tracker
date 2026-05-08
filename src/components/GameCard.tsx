import { Link } from "react-router";
import type { Game } from "../types/game";
import { useUpdateGame } from "../hooks/useUpdateGame";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const updateGameMutation = useUpdateGame();

  const handleFavoriteToggle = () => {
    updateGameMutation.mutate({ ...game, isFavorite: !game.isFavorite });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "playing":
        return "badge-primary";
      case "completed":
        return "badge-success";
      case "backlog":
        return "badge-neutral";
      default:
        return "";
    }
  };

  return (
    <div className="card bg-base-100 transition-all duration-300">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-xl font-bold">{game.title}</h2>
          <button
            onClick={handleFavoriteToggle}
            className={`btn btn-ghost btn-sm btn-circle ${game.isFavorite ? "text-warning" : "text-base-content/30"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={game.isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 my-2 flex-wrap">
          <div className={`badge ${getStatusColor(game.status)}`}>
            {game.status}
          </div>
          <div className="badge badge-outline">{game.platform}</div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{game.progress}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={game.progress}
            max="100"
          ></progress>
        </div>

        <div className="card-actions justify-end mt-6">
          <Link
            to={`/games/${game.id}`}
            className="btn btn-sm btn-soft btn-ghost"
          >
            View
          </Link>
          <Link
            to={`/games/${game.id}/edit`}
            className="btn btn-sm btn-soft btn-info"
          >
            Edit
          </Link>
          <Link
            to={`/games/${game.id}/delete`}
            className="btn btn-sm btn-soft btn-error"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};
