import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store01Icon,
  MailAtSign01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "hugeicons-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
            <Store01Icon size={24} />
          </span>
          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Super Admin Login
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage the marketplace
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </span>
              <div className="relative">
                <MailAtSign01Icon
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </span>
              <div className="relative">
                <LockPasswordIcon
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <ViewOffSlashIcon size={18} />
                  ) : (
                    <ViewIcon size={18} />
                  )}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-400"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-violet-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Business Listing Marketplace — Super Admin
        </p>
      </div>
    </div>
  );
}
