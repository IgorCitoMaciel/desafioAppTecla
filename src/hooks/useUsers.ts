import { useState, useCallback } from 'react';
import { userService } from '../services/api/users';
import type { User, PaginationMeta } from '../services/api/config';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 30,
    totalPages: 0,
  });

  const loadUsers = useCallback(
    async (page: number = 1) => {
      try {
        setLoading(true);
        setError(null);

        const response = await userService.listUsers({
          page,
          limit: pagination.limit,
        });

        if (response.error) {
          setError(response.error);
          return;
        }

        if (!response.data) {
          setError('Dados não encontrados');
          return;
        }

        const { data, meta } = response.data;
        setUsers(data);
        setPagination(meta);
      } catch (error) {
        setError('Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit],
  );

  const createUser = useCallback(
    async (userData: Omit<User, 'id'>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await userService.createUser(userData);

        if (response.error) {
          setError(response.error);
          return false;
        } else if (response.data) {
          await loadUsers(1);
          return true;
        }
        return false;
      } catch (error) {
        setError('Erro ao criar usuário');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadUsers],
  );

  const updateUser = useCallback(
    async (id: number, userData: Partial<Omit<User, 'id'>>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await userService.updateUser(id, userData);

        if (response.error) {
          setError(response.error);
          return false;
        } else if (response.data) {
          await loadUsers(pagination.page);
          return true;
        }
        return false;
      } catch (error) {
        setError('Erro ao atualizar usuário');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadUsers, pagination.page],
  );

  const deleteUser = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);

        const response = await userService.deleteUser(id);

        if (response.error) {
          setError(response.error);
          return false;
        }

        await loadUsers(pagination.page);
        return true;
      } catch (error) {
        setError('Erro ao deletar usuário');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadUsers, pagination.page],
  );

  return {
    users,
    loading,
    error,
    pagination,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
