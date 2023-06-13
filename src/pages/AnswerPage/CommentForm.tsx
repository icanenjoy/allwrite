import React, { useState, useEffect } from "react";
import { CommentFormProps } from "./PostCardProps";
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
import { Comment } from "./PostCardProps";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CommentForm = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const answerId = useSelector((state: RootState) => state.answerId);

  useEffect(() => {
    axios
      .get<Comment[]>(
        `http://34.64.145.63:5000/api/v1/answer/${answerId}/comments`
      )
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [answerId]);

  const handleSubmit = () => {
    // 실제로 서버에 댓글을 등록하는 로직을 구현해야 합니다.
    // 여기서는 단순히 새 댓글을 comments 상태에 추가하는 예시입니다.
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");
  };

  const handleReport = (index: number) => {
    // 해당 댓글을 신고하는 로직을 구현해야 합니다.
    // 여기서는 신고 수를 증가시키는 예시입니다.
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[index].reportCount += 1;
      return updatedComments;
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, backgroundColor: "orange" }}>
      <Stack spacing={2}>
        {comments.map((comment, index) => (
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
