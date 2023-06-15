import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Avatar,
  Box,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import HeartButton from "./HeartButton";
import { Answer, AnswerDetailProps } from "./PostCardProps";
import CommentForm from "./CommentForm";
import { useLocalStorage } from "usehooks-ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
  answer_id,
  content,
  onClose,
}) => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );
  const [data, setData] = useState<any>([]);
  const questionId = useSelector((state: RootState) => state.questionId);
  const answerId = useSelector((state: RootState) => state.answerId);

  useEffect(() => {
    axios
      .get(
        `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => setData(response.data));
  }, [questionId]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      sx={{
        color: "#FFF3BA",
        height: "100%", // 최대 크기로 설정
        "& .MuiDialog-paper": {
          height: "100%", // 최대 크기로 설정
        },
      }}
    >
      <Paper sx={{ backgroundColor: "#FFF3BA", width: "100%", height: "100%" }}>
        <DialogContent>
          <Typography variant="h6" align="center">
            {content}
          </Typography>
          <HeartButton likeCount={data.likeCount} isLiked={data.isLiked} />
          <CommentForm></CommentForm>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
