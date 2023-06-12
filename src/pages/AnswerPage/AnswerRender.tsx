import { Grid, dividerClasses } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import WriteButton from "./WriteButton";
import { useLocalStorage } from "usehooks-ts";
import TodayAnswer from "../../common/TodayAnswer";

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = urlParams.get("questionId");

    console.log(questionId);

    const fetchData = async () => {
      try {
        // const response = await axios.get("http://localhost:9999/answer");
        // setData(response.data);

        const response = await axios
          // .get(`http://34.64.145.63:5000/api/v1/question/${questionId)/answer`)
          .get("http://34.64.145.63:5000/api/v1/answer", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setData(response.data);
            console.log(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <TodayAnswer></TodayAnswer>
      <div style={{ display: "flex", justifyContent: "right", margin: 20 }}>
        <WriteButton></WriteButton>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        <Grid container spacing={3}>
          {data &&
            data.map(
              (answer: { _id: string; nickName: string; content: string }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <PostCard
                    answer_id={answer._id}
                    nickName={answer.nickName}
                    content={answer.content}
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
