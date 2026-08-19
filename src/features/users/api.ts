import { api } from '@/lib/api/client';
import { User, CreateUserInput, UpdateUserInput } from './types';

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const res = await api.get<any>('/api/users');
    return res.data.data || [];
  },

  getUserById: async (id: number): Promise<User> => {
    const res = await api.get<any>(`/api/users/${id}`);
    return res.data.data;
  },

  createUser: async (data: CreateUserInput | FormData): Promise<User> => {
    const res = await api.post<any>('/api/users', data);
    return res.data.data;
  },

  updateUser: async (id: number, data: UpdateUserInput | FormData): Promise<User> => {
    const res = await api.put<any>(`/api/users/${id}`, data);
    return res.data.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  }
};
