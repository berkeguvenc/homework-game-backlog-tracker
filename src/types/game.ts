// src/types/game.ts
export type GameStatus = "playing" | "completed" | "backlog";
export type Platform = "PC" | "PlayStation" | "Xbox" | "Switch" | "Mobile";

export interface Game {
  id: string;
  title: string;
  platform: Platform;
  status: GameStatus;
  progress: number; // 0 - 100 arası
  createdAt: string;
}