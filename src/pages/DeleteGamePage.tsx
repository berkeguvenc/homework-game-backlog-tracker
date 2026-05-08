import { useParams, useNavigate, Link } from "react-router";
import { useGame } from "../hooks/useGame";
import { useDeleteGame } from "../hooks/useDeleteGame";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const DeleteGamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: game,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useGame(id!);
  const deleteGameMutation = useDeleteGame();

  const handleDelete = () => {
    if (!id) return;
    deleteGameMutation.mutate(id, {
      onSuccess: () => {
        navigate("/games", { replace: true });
      },
    });
  };

  if (isQueryLoading) return <LoadingSpinner />;
  if (isError)
    return <ErrorMessage message={error.message || "Failed to load game."} />;
  if (!game) return <ErrorMessage message="Game not found." />;

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card bg-error text-error-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl mb-4">Are you sure?</h2>
          <p className="text-lg">
            You are about to delete <strong>{game.title}</strong>. This action
            cannot be undone.
          </p>
          <div className="card-actions mt-8 w-full flex gap-4">
            <Link
              to={`/games/${game.id}`}
              className={`btn flex-1 text-base-content ${deleteGameMutation.isPending ? "pointer-events-none opacity-50" : ""}`}
            >
              Cancel
            </Link>
            <button
              onClick={handleDelete}
              className="btn flex-1 bg-black text-white hover:bg-gray-800 border-none"
              disabled={deleteGameMutation.isPending}
            >
              {deleteGameMutation.isPending ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
