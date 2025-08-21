import {
  API_BASE_URL,
  type User,
  type ApiResponse,
  type PaginatedResponse,
} from './config';

type CreateUserData = Omit<User, 'id'>;
type UpdateUserData = Partial<CreateUserData>;
type ListUsersParams = {
  page?: number;
  limit?: number;
};

class UserService {
  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    try {
      console.log('Iniciando requisição createUser');
      console.log('URL da requisição:', `${API_BASE_URL}/users`);
      console.log('Dados enviados:', JSON.stringify(userData, null, 2));

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Status da resposta:', response.status);
      console.log('Resposta completa:', data);

      if (!response.ok) {
        console.error('Erro na requisição:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
      }

      return {
        data: response.ok ? data : undefined,
        error: !response.ok
          ? data.message || 'Erro ao criar usuário'
          : undefined,
        status: response.status,
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error instanceof Error) {
        console.error('Detalhes do erro:', {
          message: error.message,
          stack: error.stack,
        });
      }
      return {
        error: 'Erro ao criar usuário',
        status: 500,
      };
    }
  }

  async listUsers(
    params?: ListUsersParams,
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const url = `${API_BASE_URL}/users${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        return {
          error: errorData.message || 'Erro ao listar usuários',
          status: response.status,
        };
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: 'Erro ao listar usuários',
        status: 500,
      };
    }
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      const data = await response.json();

      return {
        data: response.ok ? data : undefined,
        error: !response.ok ? data.message : undefined,
        status: response.status,
      };
    } catch (error) {
      return {
        error: 'Erro ao buscar usuário',
        status: 500,
      };
    }
  }

  async updateUser(
    id: number,
    userData: UpdateUserData,
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return {
        data: response.ok ? data : undefined,
        error: !response.ok ? data.message : undefined,
        status: response.status,
      };
    } catch (error) {
      return {
        error: 'Erro ao atualizar usuário',
        status: 500,
      };
    }
  }

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });

      return {
        status: response.status,
        error: !response.ok ? 'Erro ao deletar usuário' : undefined,
      };
    } catch (error) {
      return {
        error: 'Erro ao deletar usuário',
        status: 500,
      };
    }
  }
}

export const userService = new UserService();
