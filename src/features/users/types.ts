export type UserRole = 'ADMIN' | 'CLIENT' | 'TEAM_MEMBER';

export interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
  image?: string | null;
  fieldId?: string | null;
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  isActive?: boolean;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: UserRole;
  isActive?: boolean;
}
