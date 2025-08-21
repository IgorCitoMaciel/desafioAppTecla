import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../shared/theme/colors';
import type { User } from '../../services/api/config';
import {
  Container,
  SearchSection,
  SearchInputContainer,
  SearchInput,
  FiltersContainer,
  FilterChip,
  FilterText,
  SuggestionContainer,
  SuggestionItem,
  SuggestionIcon,
  SuggestionInitial,
  SuggestionInfo,
  SuggestionName,
  SuggestionEmail,
} from './styles';

export type FilterOption = 'all' | 'name' | 'email';

type SearchBarProps = {
  users: User[];
  onSearch: (query: string) => void;
  onFilter: (filter: FilterOption) => void;
  onSelectUser: (user: User) => void;
  activeFilter: FilterOption;
};

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'name', label: 'Nome' },
  { value: 'email', label: 'Email' },
];

export function SearchBar({
  users,
  onSearch,
  onFilter,
  onSelectUser,
  activeFilter,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<User[]>([]);

  const getSuggestions = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim() || activeFilter === 'all') return [];

      const normalizedQuery = searchQuery.toLowerCase().trim();
      return users
        .filter(user => {
          if (activeFilter === 'name') {
            return user.name.toLowerCase().startsWith(normalizedQuery);
          }
          if (activeFilter === 'email') {
            return user.email.toLowerCase().startsWith(normalizedQuery);
          }
          return false;
        })
        .slice(0, 5);
    },
    [users, activeFilter],
  );

  useEffect(() => {
    const suggestions = getSuggestions(query);
    setSuggestions(suggestions);
  }, [query, getSuggestions]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (activeFilter === 'all') {
      onSearch(text);
    } else if (!text.trim()) {
      onSearch('');
    }
    setShowSuggestions(!!text.trim());
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  const handleFilterSelect = (filter: FilterOption) => {
    onFilter(filter);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  const handleSuggestionSelect = (user: User) => {
    setQuery(activeFilter === 'name' ? user.name : user.email);
    onSelectUser(user);
    onSearch(activeFilter === 'name' ? user.name : user.email);
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <SearchSection>
        <SearchInputContainer>
          <Icon name="search" size={24} color={colors.text.secondary} />
          <SearchInput
            placeholder={
              activeFilter === 'name'
                ? 'Digite um nome para buscar...'
                : activeFilter === 'email'
                ? 'Digite um email para buscar...'
                : 'Buscar usuários...'
            }
            value={query}
            onChangeText={handleQueryChange}
            onFocus={() => setShowSuggestions(!!query.trim())}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {query.length > 0 && (
            <Icon
              name="close"
              size={24}
              color={colors.text.secondary}
              onPress={clearSearch}
            />
          )}
        </SearchInputContainer>

        <FiltersContainer>
          {FILTER_OPTIONS.map(option => (
            <FilterChip
              key={option.value}
              isSelected={activeFilter === option.value}
              onPress={() => handleFilterSelect(option.value)}
            >
              <FilterText isSelected={activeFilter === option.value}>
                {option.label}
              </FilterText>
            </FilterChip>
          ))}
        </FiltersContainer>
      </SearchSection>

      {showSuggestions && suggestions.length > 0 && (
        <SuggestionContainer>
          {suggestions.map(user => (
            <SuggestionItem
              key={user.id}
              onPress={() => handleSuggestionSelect(user)}
            >
              <SuggestionIcon>
                <SuggestionInitial>{getInitials(user.name)}</SuggestionInitial>
              </SuggestionIcon>
              <SuggestionInfo>
                <SuggestionName>{user.name}</SuggestionName>
                <SuggestionEmail>{user.email}</SuggestionEmail>
              </SuggestionInfo>
            </SuggestionItem>
          ))}
        </SuggestionContainer>
      )}
    </Container>
  );
}
