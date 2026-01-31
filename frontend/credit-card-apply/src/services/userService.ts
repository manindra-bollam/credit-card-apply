import api from './api';
import type { User } from '../context/UserContext';

export const getUserData = async (): Promise<User> => {
  const response = await api.get('/user/me');
  return response.data.data;
};
