import { useNavigate, useParams } from "react-router";
import { GameForm } from "../components/GameForm";
import { useGame } from "../hooks/useGame";
import { useUpdateGame } from "../hooks/useUpdateGame";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import type { Game } from "../types/game";

export const EditGamePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: game,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useGame(id!);
  const updateGameMutation = useUpdateGame();

  const handleSubmit = (data: Omit<Game, "id" | "createdAt">) => {
    if (!game) return;

    updateGameMutation.mutate(
      { ...data, id: game.id, createdAt: game.createdAt },
      {
        onSuccess: () => {
          navigate("/games");
        },
      },
    );
  };

  if (isQueryLoading) return <LoadingSpinner />;
  if (isError)
    return <ErrorMessage message={error.message || "Failed to load game."} />;
  if (!game) return <ErrorMessage message="Game not found." />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Game</h1>
        <p className="text-base-content/70 mt-2">
          Update details for {game.title}.
        </p>
      </div>
      <GameForm
        initialData={game}
        onSubmit={handleSubmit}
        isLoading={updateGameMutation.isPending}
      />
    </div>
  );
};
