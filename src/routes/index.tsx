import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { LoginPage } from "../pages/LoginPage";
import { GamesPage } from "../pages/GamesPage";
import { AddGamePage } from "../pages/AddGamePage";
import { EditGamePage } from "../pages/EditGamePage";
import { GameDetailPage } from "../pages/GameDetailPage";
import { DeleteGamePage } from "../pages/DeleteGamePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/games" replace />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/games",
        element: <GamesPage />,
      },
      {
        path: "/games/add",
        element: <AddGamePage />,
      },
      {
        path: "/games/:id",
        element: <GameDetailPage />,
      },
      {
        path: "/games/:id/edit",
        element: <EditGamePage />,
      },
      {
        path: "/games/:id/delete",
        element: <DeleteGamePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
