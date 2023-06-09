import React from "react";
import styled from "styled-components";
import { Dayjs } from "dayjs";

interface SelectedDateTextProps {
  selectedDate: Dayjs; // selectedDate prop 추가
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function SelectedDateText({
  selectedDate,
  style,
  children,
}: SelectedDateTextProps) {
  return (
    <Container style={style}>
      {selectedDate && <Text>{selectedDate.format("YYYY.MM.DD")}</Text>}
      {children}
    </Container>
  );
}

export default SelectedDateText;

const Container = styled.div`
  // 스타일을 적용하세요
`;

const Text = styled.div`
  // 스타일을 적용하세요
`;
