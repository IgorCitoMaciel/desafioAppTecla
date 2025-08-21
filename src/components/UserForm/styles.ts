import styled from 'styled-components/native';
import { colors } from '../../shared/theme/colors';

export const Container = styled.View`
  padding: 16px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  flex: 1;
`;

export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  color: ${colors.text.primary};
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Input = styled.TextInput`
  background-color: ${colors.background.paper};
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  color: ${colors.text.primary};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.primary.main};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-top: 16px;
`;

export const ButtonText = styled.Text`
  color: ${colors.text.light};
  font-size: 16px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: ${colors.error.main};
  font-size: 12px;
  margin-top: 4px;
`;
