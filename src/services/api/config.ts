import { Platform } from 'react-native';

const getApiUrl = () => {
  const baseUrl =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3001'
      : 'http://localhost:3001';
  return `${baseUrl}/api`;
};

export const API_BASE_URL = getApiUrl();

console.log('API URL configurada:', API_BASE_URL);

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  address?: string;
  birthdate?: string;
};
