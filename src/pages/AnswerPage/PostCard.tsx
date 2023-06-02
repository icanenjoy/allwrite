import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

import React, { useState } from "react";
import HeartButton from "./HeartButton";
import TruncatedText from "./TextSlicer";
import { Height } from "@mui/icons-material";
import { AnswerDetail } from "./AnswerDetail";

const HoverCard = styled(Card)`
  height: 320px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export interface AnswerDetailProps {
  answer_id: number;
  onClose: () => void;
}

interface PostCardProps {
  answer_id: number;
  nick_name: string;
  content: string;
}

const PostCard: React.FC<PostCardProps> = (answer) => {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleHeartClick = () => {
    if (!clicked) {
      setCount((prev) => prev + 1);
    } else if (clicked) {
      setCount((prev) => prev - 1);
    }
    setClicked(!clicked);
  };

  const handleCardClick = () => {
    setOpen(true);
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
            <Typography variant="h5">{answer.nick_name}</Typography>
          </div>
        </CardContent>
        <CardContent onClick={handleCardClick}>
          <TruncatedText text={answer.content} maxLength={100} />
        </CardContent>
        <CardContent>
          <HeartButton onClick={handleHeartClick} clicked={clicked} />
          {count}
        </CardContent>
      </HoverCard>

      {open && (
        <AnswerDetail answer_id={answer.answer_id} onClose={handleClose} />
      )}
    </>
  );
};

export default PostCard;
