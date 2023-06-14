import React, { useState, useEffect } from "react";
import { CommentFormProps, Comment } from "./PostCardProps";
import axios from "axios";
import {
  Avatar,
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { Report } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocalStorage } from "usehooks-ts";
import jwtDecode from "jwt-decode";

const CommentForm: React.FC<CommentFormProps> = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const questionId = useSelector((state: RootState) => state.questionId);
  const answerId = useSelector((state: RootState) => state.answerId);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  useEffect(() => {
    axios
      .get<{ comments: { comment: Comment[] }[] }>(
        `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("useEffect", response.data);
        const extractedComments = response.data.comments[0].comment.map(
          (comment: Comment) => {
            return {
              nickName: comment.nickName,
              profileImg:
                "https://i.namu.wiki/i/Pmt-X4ekyEZoJL003elEka-ePn1YUsaHlJps0EXgy92xgYISoP6lZptPuC1xcnvUkB09IFqNttUpyKSRjNVNUA.webp",
              content: comment.content,
              createdAt: comment.createdAt,
              reportCount: comment.reportCount,
            };
          }
        );
        setComments(extractedComments);
      })
      .catch((error) => console.log(error));
  }, [answerId, questionId, accessToken]);

  const handleSubmit = () => {
    const newCommentObj = {
      content: newComment,
      reportCount: 0,
    };
    axios
      .post(
        `https://allwrite.kro.kr/api/v1/answer/comment/${answerId}`,
        newCommentObj,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => alert("댓글 생성 성공"))
      .catch((e) => alert(e));
  };

  const handleReport = (index: number) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[index] = {
        ...updatedComments[index],
        reportCount: updatedComments[index].reportCount + 1,
      };
      return updatedComments;
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, backgroundColor: "orange" }}>
      <Stack spacing={2}>
        {comments &&
          comments.map((comment, index) => (
            <Box key={index} display="flex" alignItems="center">
              <Avatar src={comment.profileImg} alt={comment.nickName} />
              <Box>
                <Typography
                  sx={{ ml: 2, wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                >
                  {comment.content}
                </Typography>
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {comment.nickName} | {comment.createdAt} | 신고수:{" "}
                  {comment.reportCount}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleReport(index)}>
                <Report />
              </IconButton>
            </Box>
          ))}
      </Stack>
      <TextField
        label="댓글 작성"
        variant="outlined"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ width: "80%" }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: "20%", height: 55 }}
      >
        등록
      </Button>
    </Paper>
  );
};

export default CommentForm;
