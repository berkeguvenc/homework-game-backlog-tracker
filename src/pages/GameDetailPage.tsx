import { useParams, Link } from "react-router";
import { useGame } from "../hooks/useGame";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isLoading, isError, error } = useGame(id!);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <ErrorMessage message={error.message || "Failed to load game details."} />
    );
  if (!game) return <ErrorMessage message="Game not found." />;

  const formattedDate = new Date(game.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/games" className="btn btn-ghost mb-4">
        ← Back
      </Link>

      <div className="card lg:card-side bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-start">
            <h2 className="card-title text-2xl md:text-4xl font-bold">
              {game.title}
            </h2>
            {game.isFavorite && <div className="text-warning text-3xl">★</div>}
          </div>

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="stat bg-base-200 place-items-center">
              <div className="stat-title">Platform</div>
              <div className="stat-value text-2xl">{game.platform}</div>
            </div>
            <div className="stat bg-base-200 place-items-center">
              <div className="stat-title">Status</div>
              <div className="stat-value text-2xl capitalize">
                {game.status}
              </div>
            </div>
            <div className="stat bg-base-200 place-items-center">
              <div className="stat-title">Added</div>
              <div className="stat-value text-xl">{formattedDate}</div>
            </div>
          </div>

          <div className="w-full mt-4">
            <h3 className="font-bold text-lg mb-2">Overall Progress</h3>
            <div className="flex items-center gap-4">
              <progress
                className="progress progress-primary w-full h-4"
                value={game.progress}
                max="100"
              ></progress>
              <span className="font-bold text-xl">{game.progress}%</span>
            </div>
          </div>

          <div className="card-actions flex-col sm:flex-row sm:justify-end mt-8 gap-4">
            <Link
              to={`/games/${game.id}/edit`}
              className="btn btn-soft btn-info w-full sm:w-auto sm:px-8"
            >
              Edit
            </Link>
            <Link
              to={`/games/${game.id}/delete`}
              className="btn btn-soft btn-error w-full sm:w-auto sm:px-8"
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
