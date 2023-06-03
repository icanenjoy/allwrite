import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton, Button } from "@mui/material";

function BestAnswer4() {
  const messages = ["불편한 상사랑 오마카세 먹기 VS 친구랑 같이 군대 밥 먹기"];

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
          height: "3rem",
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
            height: "3rem",
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
  display: flex;
  justify-content: center;
  text-align: center;
  color: #73a1ec;

  font-weight: 750;
`;

export default BestAnswer4;
