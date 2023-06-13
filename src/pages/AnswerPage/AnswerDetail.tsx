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

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
  answer_id,
  content,
  onClose,
}) => {
  const [data, setData] = useState([]);

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
            {answer_id}
          </Typography>
          <Typography variant="h6" align="center">
            {content}
          </Typography>
          <HeartButton />
          <CommentForm></CommentForm>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
