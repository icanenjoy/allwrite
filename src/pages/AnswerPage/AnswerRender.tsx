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
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );
  const questionId = useSelector((state: RootState) => state.questionId);
  const [visibilityScope, setVisibilityScope] = useState("friends");
  const nickName = useSelector((state: RootState) => state.nickName);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(questionId);
    console.log("테스트", nickName);

    const fetchData = async () => {
      try {
        console.log(
          `https://allwrite.kro.kr/api/v1/question/answer/${questionId}`
        );

        const response = await axios.get(
          `https://allwrite.kro.kr/api/v1/question/answer/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        // Handle error
      }
    };
    fetchData();
  }, [questionId]);

  const handleVisibilityChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setVisibilityScope(newValue);
    // Update the visibility scope on the server or perform any necessary actions
  };

  const handleToggleClick = (scope: string) => {
    switch (scope) {
      case "friends":
        axios
          .get(
            `https://allwrite.kro.kr/api/v1/question/answer/friend/${questionId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => setData(response.data))
          .catch((e) => alert(e));
        break;

      case "public":
        axios
          .get(`https://allwrite.kro.kr/api/v1/question/answer/${questionId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => setData(response.data))
          .catch((e) => alert(e));
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <TodayAnswer></TodayAnswer>
      <div style={{ display: "flex", justifyContent: "right", margin: 20 }}>
        <WriteButton></WriteButton>
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
          {data &&
            data.map(
              (answer: {
                _id: string;
                nickName: string;
                content: string;
                likeCount: number;
              }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <PostCard
                    answer_id={answer._id}
                    nickName={answer.nickName}
                    content={answer.content}
                    likeCount={answer.likeCount}
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
