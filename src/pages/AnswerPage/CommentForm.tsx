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

const CommentForm: React.FC<CommentFormProps> = ({ answer_id }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get<Comment[]>(
        `http://34.64.145.63:5000/api/v1/answer/${answer_id}/comments`
      )
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [answer_id]);

  const handleSubmit = () => {
    // 실제로 서버에 댓글을 등록하는 로직을 구현해야 합니다.
    // 여기서는 단순히 새 댓글을 comments 상태에 추가하는 예시입니다.
    const newCommentObj: Comment = {
      nickName: "카리나",
      profileImg:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcTTZLOxH1_o-Ci3z-onw0oMeUwjmlaL1-nlW9rRHlwSh10wOKYRuEwbGErOQh6o48exnXqYVnmEVKalj8k&psig=AOvVaw155_x7P1-aMTEAFeKhvQGG&ust=1686372633893000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNDw-d-xtf8CFQAAAAAdAAAAABAE",
      content: newComment,
      createdAt: new Date().toISOString(),
      reportCount: 0,
    };

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
