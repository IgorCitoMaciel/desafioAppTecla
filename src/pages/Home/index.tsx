import React, { useState, useEffect } from 'react';
import { FlatList, Modal, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../shared/theme/colors';
import { UserCard } from '../../components/UserCard';
import { UserForm } from '../../components/UserForm';
import { SearchBar, type FilterOption } from '../../components/SearchBar';
import { Pagination } from '../../components/Pagination';
import { useUsers } from '../../hooks/useUsers';
import type { User } from '../../services/api/config';
import {
  Container,
  Header,
  Title,
  AddButton,
  EmptyContainer,
  EmptyText,
  LoadingContainer,
} from './styles';

export default function Home() {
  const {
    users,
    loading,
    error,
    pagination,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [selectedSearchUser, setSelectedSearchUser] = useState<User | null>(
    null,
  );

  useEffect(() => {
    if (activeFilter === 'all') {
      loadUsers(1);
    }
  }, [loadUsers, activeFilter]);

  useEffect(() => {
    if (error) {
      Alert.alert('Erro', error);
    }
  }, [error]);

  const filteredUsers = React.useMemo(() => {
    if (activeFilter === 'all') {
      if (!searchQuery.trim()) return users;

      const normalizedQuery = searchQuery.toLowerCase().trim();
      return users.filter(
        user =>
          user.name.toLowerCase().includes(normalizedQuery) ||
          user.email.toLowerCase().includes(normalizedQuery),
      );
    }

    if (selectedSearchUser) {
      return [selectedSearchUser];
    }

    return [];
  }, [users, searchQuery, activeFilter, selectedSearchUser]);

  const handleAddUser = async (data: Omit<User, 'id'>) => {
    const success = await createUser(data);
    if (success) {
      Alert.alert('Sucesso', 'Usuário criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setActiveFilter('all');
            setSearchQuery('');
            loadUsers(1);
          },
        },
      ]);
    }
    return success;
  };

  const handleEditUser = async (data: Omit<User, 'id'>) => {
    if (!selectedUser) return false;

    const success = await updateUser(selectedUser.id, data);
    if (success) {
      setSelectedUser(undefined);
      setModalVisible(false);
      setSelectedSearchUser(null);
      setSearchQuery('');
      if (activeFilter !== 'all') {
        handleSearch('');
        handleFilterChange(activeFilter);
      }
    }
    return success;
  };

  const handleDeleteUser = async (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este usuário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            const success = await deleteUser(id);
            if (success && activeFilter !== 'all') {
              setSelectedSearchUser(null);
              setSearchQuery('');
              handleSearch('');
              handleFilterChange(activeFilter);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handlePageChange = (page: number) => {
    if (activeFilter === 'all') {
      loadUsers(page);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSelectedSearchUser(null);
    }
  };

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    setSearchQuery('');
    setSelectedSearchUser(null);
  };

  const handleUserSelect = (user: User) => {
    setSelectedSearchUser(user);
    setSearchQuery(activeFilter === 'name' ? user.name : user.email);
  };

  const getEmptyMessage = () => {
    if (activeFilter === 'all') {
      return 'Nenhum usuário cadastrado.';
    }
    if (searchQuery) {
      return 'Nenhum usuário encontrado para esta busca.';
    }
    return activeFilter === 'name'
      ? 'Digite um nome na busca.'
      : 'Digite um email na busca.';
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(undefined);
    setModalVisible(false);
  };

  if (loading && users.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Usuários</Title>
        <AddButton onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color={colors.text.light} />
        </AddButton>
      </Header>

      <SearchBar
        users={users}
        onSearch={handleSearch}
        onFilter={handleFilterChange}
        onSelectUser={handleUserSelect}
        activeFilter={activeFilter}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onEdit={openEditModal}
            onDelete={() => handleDeleteUser(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <EmptyText>{getEmptyMessage()}</EmptyText>
            {users.length === 0 && (
              <EmptyText>Toque no + para adicionar um novo usuário.</EmptyText>
            )}
          </EmptyContainer>
        )}
      />

      {activeFilter === 'all' && users.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <Container>
          <Header>
            <Title>{selectedUser ? 'Editar Usuário' : 'Novo Usuário'}</Title>
            <AddButton onPress={closeModal}>
              <Icon name="close" size={24} color={colors.text.light} />
            </AddButton>
          </Header>
          <UserForm
            user={selectedUser}
            onSubmit={selectedUser ? handleEditUser : handleAddUser}
            onFilterChange={handleFilterChange}
          />
        </Container>
      </Modal>
    </Container>
  );
}
