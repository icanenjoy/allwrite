import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PostCard from "./PostCard";
import WriteButton from "./WriteButton";
import { useLocalStorage } from "usehooks-ts";
import TodayAnswer from "../../common/TodayAnswer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AnswerRender = () => {
  const [data, setData] = useState([]);
  const [isWriteAnswer, setIsWriteAnswer] = useState(false);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const questionId = useSelector((state: RootState) => state.questionId);
  const [visibilityScope, setVisibilityScope] = useState("friend");
  const nickName = useSelector((state: RootState) => state.nickName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (visibilityScope === "public") {
          const response = await axios.get(
            `https://allwrite.kro.kr/api/v1/question/answer/public/${questionId}/?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setData(response.data.answers);
          setIsWriteAnswer(response.data.isWriteAnswer);
          setMaxPage(Math.ceil(response.data.answerCount / 12));
        } else {
          const response = await axios.get(
            `https://allwrite.kro.kr/api/v1/question/answer/friend/${questionId}/?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setData(response.data.answers);
          setIsWriteAnswer(response.data.isWriteAnswer);
          setMaxPage(Math.ceil(response.data.answerCount / 12));
        }
      } catch (err) {}
    };

    fetchData();
  }, [questionId, visibilityScope, page]);

  const handleVisibilityChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setVisibilityScope(newValue);
    setPage(1);
  };

  const handleToggleClick = (scope: string) => {
    setVisibilityScope(scope);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= maxPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{ margin: "5px" }}
        >
          {i}
        </Button>
      );
    }
    return pageButtons;
  };

  return (
    <div>
      <TodayAnswer></TodayAnswer>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: 20,
        }}
      >
        {!isWriteAnswer && <WriteButton></WriteButton>}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
        }}
      >
        <ToggleButtonGroup
          value={visibilityScope}
          exclusive
          onChange={handleVisibilityChange}
        >
          <ToggleButton
            value="friends"
            onClick={() => handleToggleClick("friends")}
          >
            친구공개
          </ToggleButton>
          <ToggleButton
            value="public"
            onClick={() => handleToggleClick("public")}
          >
            전체공개
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <Grid container spacing={3}>
          {isWriteAnswer
            ? data &&
              data.map(
                (answer: {
                  _id: string;
                  nickName: string;
                  content: string;
                  likeCount: number;
                  isWriteAnswer: boolean;
                  profileImage: "string";
                }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <PostCard
                      answer_id={answer._id}
                      nickName={answer.nickName}
                      content={answer.content}
                      likeCount={answer.likeCount}
                      isWriteAnswer={isWriteAnswer}
                      profileImage={answer.profileImage}
                    />
                  </Grid>
                )
              )
            : data &&
              data.map(
                (answer: {
                  _id: string;
                  nickName: string;
                  content: string;
                  likeCount: number;
                  isWriteAnswer: boolean;
                  profileImage: string;
                }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <PostCard
                      answer_id={answer._id}
                      nickName={answer.nickName}
                      content={answer.content}
                      likeCount={answer.likeCount}
                      isWriteAnswer={answer.isWriteAnswer}
                      profileImage={answer.profileImage}
                    />
                  </Grid>
                )
              )}
        </Grid>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        {renderPageButtons()}
      </div>
    </div>
  );
};

export default AnswerRender;
