import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const ProtectedLayout = () => {
  const isAuth = localStorage.getItem("auth") === "true";

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
