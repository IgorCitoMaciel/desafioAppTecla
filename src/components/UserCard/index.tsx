import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../shared/theme/colors';
import type { User } from '../../services/api/config';
import {
  Container,
  UserInfo,
  UserData,
  Name,
  Email,
  Address,
  BirthDate,
  ActionsContainer,
  ActionButton,
} from './styles';

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const formatDate = (date: string | undefined) => {
    if (!date) return 'Não informada';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o usuário ${user.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => onDelete(user.id),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <Container>
      <UserInfo>
        <UserData>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
          <Address>{user.address}</Address>
          <BirthDate>Nascimento: {formatDate(user.birthdate)}</BirthDate>
        </UserData>
        <ActionsContainer>
          <ActionButton onPress={() => onEdit(user)}>
            <Icon name="edit" size={24} color={colors.primary.main} />
          </ActionButton>
          <ActionButton onPress={handleDelete}>
            <Icon name="delete" size={24} color={colors.error.main} />
          </ActionButton>
        </ActionsContainer>
      </UserInfo>
    </Container>
  );
}
