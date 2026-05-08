import { useQuery } from "@tanstack/react-query";
import { getGames } from "../api/api";

export const useGames = (search?: string, status?: string, platform?: string, isFavorite?: boolean, page: number = 1, limit: number = 6) => {
  return useQuery({
    queryKey: ["games", { search, status, platform, isFavorite, page, limit }],
    queryFn: () => getGames(search, status, platform, isFavorite, page, limit),
    placeholderData: (previousData) => previousData,
  });
};
