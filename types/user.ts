export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  provider?: string;
  created_at: string;
  updated_at: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}
