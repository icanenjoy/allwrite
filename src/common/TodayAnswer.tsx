import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Box, IconButton, Button, Grid } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setQuestionId } from "../store";
import { useNavigate } from "react-router-dom";

const TodayAnswer = () => {
  const [question, setQuestion] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

  const dispatch = useDispatch();
  const questionId = useSelector((state: RootState) => state.questionId);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://allwrite.kro.kr/api/v1/question", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("하영", response.data);
        const newQuestion = response.data.question.map((q: any) => [
          q._id,
          q.content,
        ]);
        setQuestion(newQuestion);

        console.log("Response Question", newQuestion);
        setLoading(false);
        dispatch(setQuestionId(newQuestion[0][0])); // questionId 업데이트
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
    const nextIndex = (currentMessageIndex + 1) % question.length;
    setCurrentMessageIndex(nextIndex);
    const nextQuestionId = question[nextIndex][0];
    dispatch(setQuestionId(nextQuestionId)); // questionId 업데이트
    console.log(nextIndex);
  };

  const handlePrevClick = () => {
    const newIndex =
      (currentMessageIndex - 1 + question.length) % question.length;
    setCurrentMessageIndex(newIndex);
    const newQuestionId = question[newIndex][0];
    dispatch(setQuestionId(newQuestionId)); // questionId 업데이트
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중이면 로딩 표시
  }

  const currentMessage =
    question.length > 0 ? question[currentMessageIndex][1] : null;

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={8} md={7} lg={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f9aa43",
            padding: "5px",
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
              width: "100%",
              height: "4.4rem",
              backgroundColor: "#f9aa43",
              color: "#8d3e02",
              "&:hover": {
                backgroundColor: "#f9aa43",
              },
            }}
            onClick={() => {
              dispatch(setQuestionId(question[currentMessageIndex][0])); // questionId 업데이트
              navigate("/answer");
            }}
          >
            {currentMessage}
          </Button>
          <IconButton onClick={handleNextClick}>
            <StyledArrowForward sx={{ color: "#8d3e02" }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TodayAnswer;
