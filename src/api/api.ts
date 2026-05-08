import axios from "axios";
import type { Game } from "../types/game";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getGames = async (search?: string, status?: string, platform?: string, isFavorite?: boolean, page: number = 1, limit: number = 6): Promise<{ data: Game[], total: number }> => {
  const params = new URLSearchParams();
  if (search) params.append("title_like", search);
  if (status) params.append("status", status);
  if (platform) params.append("platform", platform);
  
  params.append("_page", page.toString());
  params.append("_limit", limit.toString());

  const queryParams: Record<string, string | number> = {
    _page: page,
    _per_page: limit,
  };
  
  if (status) queryParams.status = status;
  if (platform) queryParams.platform = platform;
  if (isFavorite) queryParams.isFavorite = "true";

  const res = await api.get("/games", { params: queryParams });
  
  let games = res.data.data ? res.data.data : res.data; 
  let total = res.data.items || (games.length > 0 ? 100 : 0); 
  
  if (res.data.data !== undefined) {
    games = res.data.data;
    total = res.data.items;
  }
  
  if (search) {
    games = games.filter((g: Game) => g.title.toLowerCase().includes(search.toLowerCase()));
  }

  return { data: games, total };
};

export const getAllGames = async (): Promise<Game[]> => {
    const res = await api.get("/games");
    return res.data;
};

export const getGame = async (id: string): Promise<Game> => {
  const res = await api.get(`/games/${id}`);
  return res.data;
};

export const createGame = async (game: Omit<Game, "id" | "createdAt">): Promise<Game> => {
  const newGame = {
    ...game,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const res = await api.post("/games", newGame);
  return res.data;
};

export const updateGame = async (game: Game): Promise<Game> => {
  const res = await api.put(`/games/${game.id}`, game);
  return res.data;
};

export const deleteGame = async (id: string): Promise<void> => {
  await api.delete(`/games/${id}`);
};
