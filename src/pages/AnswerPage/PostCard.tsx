import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

import React, { useState } from "react";
import HeartButton from "./HeartButton";
import TruncatedText from "./TextSlicer";
import { Height } from "@mui/icons-material";
import { AnswerDetail } from "./AnswerDetail";
import { PostCardProps, HeartButtonProps } from "./PostCardProps";

const HoverCard = styled(Card)`
  height: 320px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const PostCard: React.FC<PostCardProps> = (answer) => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);

  const handleCardClick = () => {
    setOpen(true);
  };

  const handleLikeClick = () => {
    setLike((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HoverCard>
        <CardContent onClick={handleCardClick}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Profile Image"
              src="https://i.namu.wiki/i/Pmt-X4ekyEZoJL003elEka-ePn1YUsaHlJps0EXgy92xgYISoP6lZptPuC1xcnvUkB09IFqNttUpyKSRjNVNUA.webp"
              variant="circular"
              style={{ marginRight: "16px" }}
            />
            <Typography variant="h5">{answer.nickName}</Typography>
          </div>
        </CardContent>
        <CardContent
          style={{ height: "100px", overflow: "hidden" }}
          onClick={handleCardClick}
        >
          <TruncatedText text={answer.content} maxLength={100} />
        </CardContent>
        {/* <CardContent>
          <HeartButton answer_id={answer.answer_id} />
        </CardContent> */}
      </HoverCard>

      {open && (
        <AnswerDetail
          answer_id={answer.answer_id}
          content={answer.content}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default PostCard;
