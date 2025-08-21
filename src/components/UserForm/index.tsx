import React, { useState } from 'react';
import { Alert } from 'react-native';
import type { User } from '../../services/api/config';
import type { FilterOption } from '../SearchBar';
import {
  Container,
  ScrollContainer,
  InputContainer,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorText,
} from './styles';

type UserFormProps = {
  user?: User;
  onSubmit: (data: Omit<User, 'id'>) => Promise<boolean>;
  onFilterChange?: (filter: FilterOption) => void;
};

export function UserForm({ user, onSubmit }: UserFormProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [birthdate, setBirthdate] = useState(
    user?.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Email inválido';
    }

    if (birthdate) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
        newErrors.birthdate = 'Use o formato YYYY-MM-DD';
      } else {
        const date = new Date(birthdate);
        if (isNaN(date.getTime())) {
          newErrors.birthdate = 'Data inválida';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const userData = {
          name: name.trim(),
          email: email.trim(),
          address: address.trim() || undefined,
          birthdate: birthdate || undefined,
        };

        await onSubmit(userData);

        // Limpa o formulário apenas se for criação
        if (!user) {
          setName('');
          setEmail('');
          setAddress('');
          setBirthdate('');
          setErrors({});
        }
      } catch (error: any) {
        console.error('Erro no formulário:', error);

        let errorMessage = 'Ocorreu um erro ao processar os dados.';

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        Alert.alert('Erro', errorMessage);
      }
    }
  };

  const handleBirthdateChange = (text: string) => {
    // Remove qualquer caractere que não seja número ou hífen
    const cleaned = text.replace(/[^\d-]/g, '');

    // Formata para YYYY-MM-DD
    let formatted = cleaned;
    if (cleaned.length >= 4 && !cleaned.includes('-')) {
      formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4);
    }
    if (cleaned.length >= 7 && cleaned.split('-').length === 2) {
      const parts = formatted.split('-');
      formatted =
        parts[0] + '-' + parts[1].slice(0, 2) + '-' + parts[1].slice(2);
    }

    setBirthdate(formatted);
    if (errors.birthdate) {
      setErrors(prev => ({ ...prev, birthdate: '' }));
    }
  };

  return (
    <ScrollContainer>
      <Container>
        <InputContainer>
          <Label>Nome *</Label>
          <Input
            placeholder="Digite o nome"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }));
              }
            }}
            autoCapitalize="words"
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Label>Email *</Label>
          <Input
            placeholder="Digite o email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Label>Endereço</Label>
          <Input
            placeholder="Digite o endereço"
            value={address}
            onChangeText={setAddress}
            autoCapitalize="words"
          />
        </InputContainer>

        <InputContainer>
          <Label>Data de Nascimento (YYYY-MM-DD)</Label>
          <Input
            placeholder="YYYY-MM-DD"
            value={birthdate}
            onChangeText={handleBirthdateChange}
            maxLength={10}
            keyboardType="numeric"
          />
          {errors.birthdate && <ErrorText>{errors.birthdate}</ErrorText>}
        </InputContainer>

        <Button onPress={handleSubmit}>
          <ButtonText>{user ? 'Atualizar' : 'Cadastrar'}</ButtonText>
        </Button>
      </Container>
    </ScrollContainer>
  );
}
