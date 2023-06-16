import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import WriteButton from "./WriteButton";
import { useLocalStorage } from "usehooks-ts";
import TodayAnswer from "../../common/TodayAnswer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { resolve } from "path";

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
  const questionId = useSelector((state: RootState) => state.questionId);
  const [visibilityScope, setVisibilityScope] = useState("friend");
  const nickName = useSelector((state: RootState) => state.nickName);

  useEffect(() => {
    console.log("Render UseEffect", visibilityScope);

    const fetchData = async () => {
      try {
        if (visibilityScope == "public") {
          const response = await axios
            .get(
              `https://allwrite.kro.kr/api/v1/question/answer/public/${questionId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              setData(response.data.answers);
              setIsWriteAnswer(response.data.isWriteAnswer);
            })
            .then(() => console.log(data))
            .catch((e) => {
              alert(e);
            });
        } else {
          const response = await axios
            .get(
              `https://allwrite.kro.kr/api/v1/question/answer/friend/${questionId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              setData(response.data.answers);
              setIsWriteAnswer(response.data.isWriteAnswer);
            })
            .then(() => console.log(visibilityScope, data, isWriteAnswer))
            .catch();
        }
      } catch (err) {
        // Handle error
      }
    };

    fetchData();
  }, [questionId, visibilityScope]);

  const handleVisibilityChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setVisibilityScope(newValue);
    // Update the visibility scope on the server or perform any necessary actions
  };

  const handleToggleClick = (scope: string) => {
    setVisibilityScope(scope);
  };

  return (
    <div>
      <TodayAnswer></TodayAnswer>
      <div style={{ display: "flex", justifyContent: "right", margin: 20 }}>
        {!isWriteAnswer && <WriteButton></WriteButton>}
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <ToggleButtonGroup
          value={visibilityScope}
          exclusive
          onChange={handleVisibilityChange}
        >
          <ToggleButton
            value="friends"
            onClick={() => handleToggleClick("friends")}
          >
            Friends
          </ToggleButton>
          <ToggleButton
            value="public"
            onClick={() => handleToggleClick("public")}
          >
            Public
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
    </div>
  );
};

export default AnswerRender;
