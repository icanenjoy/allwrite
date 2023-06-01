import { Grid, dividerClasses } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import WriteButton from "./WriteButton";

const AnswerRender = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9999/answer");
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetch Test</h1>
      <WriteButton></WriteButton>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={3}>
          {data &&
            data.map(
              (answer: {
                answer_id: number;
                nick_name: string;
                content: string;
              }) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  key={answer.answer_id}
                >
                  <PostCard
                    answer_id={answer.answer_id}
                    nick_name={answer.nick_name}
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
