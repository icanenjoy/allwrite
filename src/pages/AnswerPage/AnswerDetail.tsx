import { Dialog, DialogContent, Typography } from "@mui/material";
import React from "react";
import { AnswerDetailProps } from "./PostCard";

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
  answer_id,
  onClose,
}) => (
  <Dialog open={true} onClose={onClose}>
    <DialogContent>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {answer_id}
      </Typography>
    </DialogContent>
  </Dialog>
);
