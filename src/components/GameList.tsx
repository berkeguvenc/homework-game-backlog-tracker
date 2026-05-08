import type { Game } from "../types/game";
import { GameCard } from "./GameCard";
import { EmptyState } from "./EmptyState";

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  if (games.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
