import { useQuery } from "@tanstack/react-query";
import { getGame } from "../api/api";

export const useGame = (id: string) => {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => getGame(id),
    enabled: !!id,
  });
};
