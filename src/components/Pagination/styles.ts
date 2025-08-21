import styled from 'styled-components/native';
import { colors } from '../../shared/theme/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${colors.background.paper};
  border-top-width: 1px;
  border-top-color: ${colors.background.default};
`;

export const PageInfo = styled.Text`
  color: ${colors.text.primary};
  font-size: 14px;
  margin: 0 16px;
`;

export const NavigationButton = styled.TouchableOpacity`
  padding: 8px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;
