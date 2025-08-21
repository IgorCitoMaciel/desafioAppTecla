import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { colors } from '../../shared/theme/colors';

export const Container = styled.View`
  background-color: ${colors.background.paper};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.background.default};
`;

export const SearchSection = styled.View`
  padding: 16px;
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.background.default};
  border-radius: 8px;
  padding: 0 12px;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 1px;
      shadow-opacity: 0.1;
      shadow-radius: 2px;
    `,
    android: `
      elevation: 2;
    `,
  })}
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  color: ${colors.text.primary};
`;

export const FiltersContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 8px;
`;

export const FilterChip = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.isSelected ? colors.primary.main : colors.background.default};
  border-radius: 16px;
  padding: 6px 12px;
  margin-right: 8px;
`;

export const FilterText = styled.Text<{ isSelected: boolean }>`
  color: ${props =>
    props.isSelected ? colors.text.light : colors.text.primary};
  font-size: 14px;
`;

export const SuggestionContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 16px;
  right: 16px;
  background-color: ${colors.background.paper};
  border-radius: 8px;
  margin-top: 4px;
  max-height: 300px;
  overflow: hidden;
  z-index: 999;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.15;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 4;
    `,
  })}
`;

export const SuggestionItem = styled.TouchableOpacity`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.background.default};
`;

export const SuggestionIcon = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.primary.light};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 1px;
      shadow-opacity: 0.1;
      shadow-radius: 1px;
    `,
    android: `
      elevation: 1;
    `,
  })}
`;

export const SuggestionInitial = styled.Text`
  color: ${colors.text.light};
  font-size: 16px;
  font-weight: bold;
`;

export const SuggestionInfo = styled.View`
  flex: 1;
`;

export const SuggestionName = styled.Text`
  color: ${colors.text.primary};
  font-size: 14px;
  font-weight: 500;
`;

export const SuggestionEmail = styled.Text`
  color: ${colors.text.secondary};
  font-size: 12px;
  margin-top: 2px;
`;
