import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGame } from "../api/api";
import type { Game } from "../types/game";

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGame,
    onMutate: async (updatedGame) => {
      await queryClient.cancelQueries({ queryKey: ["games"] });
      await queryClient.cancelQueries({ queryKey: ["game", updatedGame.id] });

      const previousGames = queryClient.getQueryData<{ data: Game[], total: number }>(["games"]);
      const previousGame = queryClient.getQueryData<Game>(["game", updatedGame.id]);

      queryClient.setQueriesData<{ data: Game[], total: number }>({ queryKey: ["games"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((game) => (game.id === updatedGame.id ? updatedGame : game)),
        };
      });

      queryClient.setQueryData(["game", updatedGame.id], updatedGame);

      return { previousGames, previousGame };
    },
    onError: (_err, updatedGame, context) => {
      if (context?.previousGames) {
        queryClient.setQueriesData({ queryKey: ["games"] }, context.previousGames);
      }
      if (context?.previousGame) {
        queryClient.setQueryData(["game", updatedGame.id], context.previousGame);
      }
    },
    onSettled: (updatedGame) => {
      if (updatedGame) {
         queryClient.invalidateQueries({ queryKey: ["games"] });
         queryClient.invalidateQueries({ queryKey: ["game", updatedGame.id] });
      }
    },
  });
};
