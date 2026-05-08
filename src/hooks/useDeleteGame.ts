import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGame } from "../api/api";
import type { Game } from "../types/game";

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGame,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["games"] });

      const previousGames = queryClient.getQueryData<{ data: Game[], total: number }>(["games"]);

      queryClient.setQueriesData<{ data: Game[], total: number }>({ queryKey: ["games"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((game) => game.id !== id),
          total: old.total - 1,
        };
      });

      return { previousGames };
    },
    onError: (_err, _id, context) => {
      if (context?.previousGames) {
        queryClient.setQueriesData({ queryKey: ["games"] }, context.previousGames);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};
