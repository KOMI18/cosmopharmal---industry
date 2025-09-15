
export interface Admin {
    id: number;
    email: string;
    name: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {

  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  setAdmin: (admin: Admin) => void;
  checkAuthStatus: () => boolean;
}
export interface AuthResponse {
    admin: Admin
    message : String
  }