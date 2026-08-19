import { useRef } from "react";
import { ImageUpload01Icon, Cancel01Icon } from "hugeicons-react";

export function SingleImageUpload({
  label,
  value,
  onChange,
  aspect = "aspect-video",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    onChange(URL.createObjectURL(file));
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <div
        className={`relative flex ${aspect} w-full max-w-xs items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50`}
      >
        {value ? (
          <>
            <img src={value} alt={label} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={`Remove ${label}`}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-gray-600 shadow hover:text-red-600"
            >
              <Cancel01Icon size={14} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center gap-2 text-xs text-gray-400 hover:text-violet-600"
          >
            <ImageUpload01Icon size={22} />
            Upload {label}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

export function GalleryUpload({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    onChange([...values, ...urls]);
  };

  const removeAt = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <div className="flex flex-wrap gap-3">
        {values.map((url, i) => (
          <div
            key={url + i}
            className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label="Remove image"
              className="absolute right-1 top-1 rounded-full bg-white/90 p-0.5 text-gray-600 shadow hover:text-red-600"
            >
              <Cancel01Icon size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:text-violet-600"
        >
          <ImageUpload01Icon size={18} />
          <span className="text-[10px]">Add</span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
