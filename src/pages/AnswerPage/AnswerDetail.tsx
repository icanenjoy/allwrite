import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import HeartButton from "./HeartButton";
import { Answer, Comment, AnswerDetailProps } from "./PostCardProps";

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
  answer_id,
  content,
  onClose,
}) => {
  const [data, setData] = useState<Answer>({ content: "", comments: [] });
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axios
      .get("http://34.64.145.63:5000/api/v1/answer/" + answer_id)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [answer_id]);

  const handleCommentTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentText,
      user: {
        name: "John Doe", // 유저 이름
        profilePicture: "profile.jpg", // 프로필 사진 경로
      },
    };
    const newComments = [...data.comments, newComment];
    setData((prevData) => ({
      ...prevData,
      comments: newComments,
    }));
    setCommentText("");
  };

  const handleDeleteComment = (commentId: string) => {
    const filteredComments = data.comments.filter(
      (comment) => comment.id !== commentId
    );
    setData((prevData) => ({
      ...prevData,
      comments: filteredComments,
    }));
  };

  const handleEditComment = (commentId: string, newContent: string) => {
    const updatedComments = data.comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: newContent,
        };
      }
      return comment;
    });
    setData((prevData) => ({
      ...prevData,
      comments: updatedComments,
    }));
  };

  return (
    <Dialog open={true} onClose={onClose} sx={{ color: "#FFF3BA" }}>
      <DialogContent>
        <Typography variant="h6" align="center">
          {answer_id}
        </Typography>
        <Typography variant="h6" align="center">
          {content}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "left", mt: 2 }}>
          Comments:
        </Typography>
        {data.comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Avatar
              src={comment.user.profilePicture}
              alt={comment.user.name}
              sx={{ marginRight: 1 }}
            />
            <Box>
              <Typography variant="subtitle1">{comment.user.name}</Typography>
              <Typography variant="body1">{comment.content}</Typography>
              <Box sx={{ display: "flex", mt: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleEditComment(comment.id, "New content")}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
        <HeartButton answer_id={answer_id} />
        <TextField
          label="댓글을 입력하세요."
          value={commentText}
          onChange={handleCommentTextChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddComment}>
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};
