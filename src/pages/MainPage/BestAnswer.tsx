import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Box, IconButton, Button } from "@mui/material";

function BestAnswer(props: any) {
  const currentMessage = props.msg;

  const [question, setQuestion] = useState<any>([]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9aa43",
          padding: "5px",
          width: "25rem",
          height: "4rem",
          borderRadius: "1rem",
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
            backgroundColor: "#f9aa43",
            color: "#8d3e02",
            "&:hover": {
              backgroundColor: "#f9aa43",
            },
          }}
        >
          {currentMessage?.question}
        </Button>
        <IconButton></IconButton>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 29.5rem;
  height: 1rem;
  margin-top: 5.5rem;
  display: grid;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;

export default BestAnswer;
