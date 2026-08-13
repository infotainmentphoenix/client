export interface User {
  id: number;
  email: string;
  phone?: string | null;
  name?: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user?: User;
  accessToken?: string;
}

export interface LoginInput {
  email: string;
  password?: string;
  googleToken?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password?: string;
  googleToken?: string;
}
