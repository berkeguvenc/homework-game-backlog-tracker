import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGame } from "../api/api";

export const useAddGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};
