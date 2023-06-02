import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton, Button } from "@mui/material";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

function TodayAnswer() {
  const messages = [
    "10년 전 과거로 가기 vs 10년 후 미래로 가기",
    "주로 보는 유튜브 채널은?",
    "잠수이별 VS 환승이별",
  ];

  const StyledArrowBack = styled(ArrowBackIosRoundedIcon)(({ theme }) => ({
    color: "deepskyblue",
    fontSize: "32px",
  }));

  const StyledArrowForward = styled(ArrowForwardIosRoundedIcon)(
    ({ theme }) => ({
      color: "deepskyblue",
      fontSize: "32px",
    })
  );

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const handlePrevClick = () => {
    setCurrentMessageIndex((prevIndex) =>
      prevIndex === 0 ? messages.length - 1 : prevIndex - 1
    );
  };

  const currentMessage = messages[currentMessageIndex];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "skyblue",
          padding: "5px",
          width: "54.8rem",
          height: "4rem",
          borderRadius: "1.5rem",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <IconButton onClick={handlePrevClick}>
          <StyledArrowBack />
        </IconButton>
        <Button
          sx={{
            width: "55rem",
            height: "4.4rem",
            backgroundColor: "skyblue",
            "&:hover": {
              backgroundColor: "skyblue",
            },
          }}
        >
          {currentMessage}
        </Button>
        <IconButton onClick={handleNextClick}>
          <StyledArrowForward />
        </IconButton>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;

export default TodayAnswer;
