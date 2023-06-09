import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Box, IconButton, Button } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const TodayAnswer = () => {
  const [question, setQuestion] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

  useEffect(() => {
    axios
      .get("http://34.64.145.63:5000/api/v1/question", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setQuestion(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
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
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % question.length);
  };

  const handlePrevClick = () => {
    setCurrentMessageIndex((prevIndex) =>
      prevIndex === 0 ? question.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중이면 로딩 표시
  }

  const currentMessage =
    question.length > 0 ? question[currentMessageIndex] : null;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9aa43",
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
          <StyledArrowBack sx={{ color: "#8d3e02" }} />
        </IconButton>
        <Button
          sx={{
            width: "55rem",
            height: "4.4rem",
            backgroundColor: "#f9aa43",
            color: "#8d3e02",
            "&:hover": {
              backgroundColor: "#f9aa43",
            },
          }}
        >
          {currentMessage?.question}
        </Button>
        <IconButton onClick={handleNextClick}>
          <StyledArrowForward sx={{ color: "#8d3e02" }} />
        </IconButton>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #f9aa43;
  font-weight: 750;
`;

export default TodayAnswer;
