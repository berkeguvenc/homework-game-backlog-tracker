import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useGames } from "../hooks/useGames";
import { GameList } from "../components/GameList";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError, error } = useGames(
    debouncedSearch,
    statusFilter,
    platformFilter,
    isFavoriteFilter,
    page,
    limit,
  );

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatformFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-100 p-4">
        <h1 className="text-3xl font-bold">My Backlog</h1>
        <div className="flex flex-wrap items-center gap-4">
          <label className="cursor-pointer flex items-center gap-2">
            <span className="label-text font-medium">Favorites Only</span>
            <input
              type="checkbox"
              className="toggle toggle-warning"
              checked={isFavoriteFilter}
              onChange={(e) => {
                setIsFavoriteFilter(e.target.checked);
                setPage(1);
              }}
            />
          </label>
          <Link to="/games/add" className="btn btn-primary">
            + Add New Game
          </Link>
        </div>
      </div>

      <div className="bg-base-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Search Games</span>
          </label>
          <input
            type="text"
            placeholder="Search by title..."
            className="input w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Filter by Status</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="backlog">Backlog</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Filter by Platform</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={platformFilter}
            onChange={handlePlatformChange}
          >
            <option value="">All Platforms</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorMessage message={error.message || "Failed to load games."} />
      ) : (
        <>
          <GameList games={data?.data || []} />

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {page} of {totalPages}
                </button>
                <button
                  className="join-item btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
