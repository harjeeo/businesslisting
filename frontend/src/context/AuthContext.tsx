import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api, setAuthToken, getAuthToken, ApiError } from "../lib/api";

export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  status: "Active" | "Inactive";
  lastActive: string;
}

interface AuthContextValue {
  admin: AdminProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      setIsLoading(false);
      return;
    }
    api
      .get<AdminProfile>("/auth/me")
      .then(setAdmin)
      .catch(() => setAuthToken(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, admin: profile } = await api.post<{
      token: string;
      admin: AdminProfile;
    }>("/auth/login", { email, password });
    setAuthToken(token);
    setAdmin(profile);
  };

  const logout = () => {
    setAuthToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ApiError };
