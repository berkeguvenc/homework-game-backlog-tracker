import { Navigate, Outlet } from "react-router";

export const PublicLayout = () => {
  const isAuth = localStorage.getItem("auth") === "true";

  if (isAuth) {
    return <Navigate to="/games" replace />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Outlet />
    </div>
  );
};
