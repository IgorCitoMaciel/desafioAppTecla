import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../shared/theme/colors';
import { Container, PageInfo, NavigationButton } from './styles';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Container>
      <NavigationButton onPress={handlePrevious} disabled={currentPage === 1}>
        <Icon
          name="chevron-left"
          size={24}
          color={currentPage === 1 ? colors.text.disabled : colors.primary.main}
        />
      </NavigationButton>

      <PageInfo>
        Página {currentPage} de {totalPages}
      </PageInfo>

      <NavigationButton
        onPress={handleNext}
        disabled={currentPage === totalPages}
      >
        <Icon
          name="chevron-right"
          size={24}
          color={
            currentPage === totalPages
              ? colors.text.disabled
              : colors.primary.main
          }
        />
      </NavigationButton>
    </Container>
  );
}
