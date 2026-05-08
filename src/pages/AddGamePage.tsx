import { useNavigate } from "react-router";
import { GameForm } from "../components/GameForm";
import { useAddGame } from "../hooks/useAddGame";
import type { Game } from "../types/game";

export const AddGamePage = () => {
  const navigate = useNavigate();
  const addGameMutation = useAddGame();

  const handleSubmit = (data: Omit<Game, "id" | "createdAt">) => {
    addGameMutation.mutate(data, {
      onSuccess: () => {
        navigate("/games");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Game</h1>
        <p className="text-base-content/70 mt-2">
          Add a new game to your backlog.
        </p>
      </div>
      <GameForm onSubmit={handleSubmit} isLoading={addGameMutation.isPending} />
    </div>
  );
};
