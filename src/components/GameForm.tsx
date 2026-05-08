import type { Game, GameStatus, Platform } from "../types/game";
import { useNavigate } from "react-router";

interface GameFormProps {
  initialData?: Game;
  onSubmit: (data: Omit<Game, "id" | "createdAt">) => void;
  isLoading: boolean;
}

export const GameForm = ({
  initialData,
  onSubmit,
  isLoading,
}: GameFormProps) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      platform: formData.get("platform") as Platform,
      status: formData.get("status") as GameStatus,
      progress: Number(formData.get("progress")),
      isFavorite: formData.get("isFavorite") === "on",
    };
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-base-100 p-6 sm:p-8 max-w-2xl mx-auto"
    >
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">Game Title</span>
        </label>
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title || ""}
          placeholder="e.g. The Witcher 3"
          className="input w-full"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Platform</span>
          </label>
          <select
            name="platform"
            defaultValue={initialData?.platform || "PC"}
            className="select select-bordered w-full"
          >
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Status</span>
          </label>
          <select
            name="status"
            defaultValue={initialData?.status || "backlog"}
            className="select select-bordered w-full"
          >
            <option value="backlog">Backlog</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">
            Progress (
            <output id="progressOutput">{initialData?.progress || 0}</output>%)
          </span>
        </label>
        <input
          type="range"
          name="progress"
          min={0}
          max={100}
          defaultValue={initialData?.progress || 0}
          onInput={(e) => {
            const output = document.getElementById("progressOutput");
            if (output) output.textContent = e.currentTarget.value;
          }}
          className="range range-primary w-full"
        />
        <div className="flex justify-between px-2 text-xs mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            name="isFavorite"
            defaultChecked={initialData?.isFavorite || false}
            className="checkbox checkbox-primary"
          />
          <span className="label-text font-bold">Mark as Favorite</span>
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-ghost flex-1"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : initialData ? (
            "Update Game"
          ) : (
            "Add Game"
          )}
        </button>
      </div>
    </form>
  );
};
