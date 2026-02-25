import axios from 'axios';
import type { User } from '@/models';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },
};
