import type {
  SelectHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

function Wrapper({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

const inputClasses =
  "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100";

export function TextField({
  label,
  hint,
  ...rest
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper label={label} hint={hint}>
      <input className={inputClasses} {...rest} />
    </Wrapper>
  );
}

export function TextareaField({
  label,
  hint,
  ...rest
}: { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper label={label} hint={hint}>
      <textarea className={`${inputClasses} resize-none`} rows={4} {...rest} />
    </Wrapper>
  );
}

export function SelectField({
  label,
  options,
  ...rest
}: {
  label: string;
  options: string[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper label={label}>
      <select className={inputClasses} {...rest}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
