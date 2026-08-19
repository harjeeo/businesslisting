import { useRef, useState } from "react";
import { Video01Icon, YoutubeIcon, Cancel01Icon } from "hugeicons-react";

type Mode = "upload" | "youtube";

export function VideoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("upload");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>

      <div className="mb-2 inline-flex rounded-lg border border-gray-200 p-0.5">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "upload" ? "bg-violet-50 text-violet-700" : "text-gray-500"
          }`}
        >
          <Video01Icon size={14} />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("youtube")}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "youtube" ? "bg-violet-50 text-violet-700" : "text-gray-500"
          }`}
        >
          <YoutubeIcon size={14} />
          YouTube Link
        </button>
      </div>

      {mode === "youtube" ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
      ) : value ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-600">
          <Video01Icon size={16} />
          <span className="flex-1 truncate">Video attached</span>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove video"
            className="text-gray-400 hover:text-red-600"
          >
            <Cancel01Icon size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3.5 py-4 text-xs text-gray-400 hover:text-violet-600"
        >
          <Video01Icon size={18} />
          Upload a video file
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}
