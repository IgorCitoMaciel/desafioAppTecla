import styled from 'styled-components/native';
import { colors } from '../../shared/theme/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background.default};
`;

export const Header = styled.View`
  padding: 16px;
  background-color: ${colors.primary.main};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.text.light};
  font-size: 20px;
  font-weight: bold;
`;

export const AddButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const EmptyText = styled.Text`
  color: ${colors.text.secondary};
  font-size: 16px;
  text-align: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background.default};
`;

export const LoadingMore = styled.View`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;
