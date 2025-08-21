import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { colors } from '../../shared/theme/colors';

export const Container = styled.View`
  background-color: ${colors.background.paper};
  border-radius: 8px;
  padding: 16px;
  margin: 8px 16px;

  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: `
      elevation: 4;
    `,
  })}
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserData = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.text.primary};
`;

export const Email = styled.Text`
  font-size: 14px;
  color: ${colors.text.secondary};
  margin-top: 4px;
`;

export const Address = styled.Text`
  font-size: 14px;
  color: ${colors.text.secondary};
  margin-top: 4px;
`;

export const BirthDate = styled.Text`
  font-size: 14px;
  color: ${colors.text.secondary};
  margin-top: 4px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  margin-left: 16px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 8px;
`;
