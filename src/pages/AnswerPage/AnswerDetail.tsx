import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AnswerDetailProps } from "./PostCardProps";
import axios from "axios";

interface Answer {
  content: string;
  comments: string[];
}

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
  answer_id,
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
    const newComments = [...data.comments, commentText];
    setData((prevData) => ({
      ...prevData,
      comments: newComments,
    }));
    setCommentText("");
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {answer_id}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {data.content}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Comments:
        </Typography>
        {data.comments.map((comment, index) => (
          <Typography key={index} variant="body1" sx={{ textAlign: "center" }}>
            {comment}
          </Typography>
        ))}
        <TextField
          label="Add Comment"
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
