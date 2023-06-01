import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton, Button } from "@mui/material";

function BestAnswer() {
  const messages = ["10년 전 과거로 가기 vs 10년 후 미래로 가기"];

  const currentMessage = messages;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "skyblue",
          padding: "5px",
          width: "25rem",
          height: "4rem",
          borderRadius: "1.5rem",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <IconButton></IconButton>
        <Button
          sx={{
            width: "100%",
            height: "4.4rem",
            backgroundColor: "skyblue",
            "&:hover": {
              backgroundColor: "skyblue",
            },
          }}
        >
          {currentMessage}
        </Button>
        <IconButton></IconButton>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 29.5rem;
  height: 5rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;

export default BestAnswer;
