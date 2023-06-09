import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

import React, { useState } from "react";
import HeartButton from "./HeartButton";
import TruncatedText from "./TextSlicer";
import { Height, Translate } from "@mui/icons-material";
import { AnswerDetail } from "./AnswerDetail";
import { PostCardProps, HeartButtonProps } from "./PostCardProps";
import { useNavigate } from "react-router-dom";

const HoverCard = styled(Card)`
  height: 350px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const PostCard: React.FC<PostCardProps> = (answer) => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setOpen(true);
  };

  const handleLikeClick = () => {
    setLike((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goMyPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    navigate(`/mypage/nickname="${answer.nickName}"`);
  };
  return (
    <>
      <HoverCard
        sx={{ backgroundColor: "#FFCF53", borderRadius: 6 }}
        onClick={() => handleCardClick()}
      >
        <CardContent onClick={handleCardClick}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px", // Adjust the margin here
            }}
          >
            <Avatar
              alt="Profile Image"
              src="https://i.namu.wiki/i/Pmt-X4ekyEZoJL003elEka-ePn1YUsaHlJps0EXgy92xgYISoP6lZptPuC1xcnvUkB09IFqNttUpyKSRjNVNUA.webp"
              variant="circular"
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                padding: 0,
                marginTop: "10px",
              }}
              onClick={(e) => goMyPage(e)}
            />
          </div>
        </CardContent>
        <CardContent onClick={(e) => goMyPage(e)}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              marginTop: "-20px", // Adjust the margin here
            }}
            variant="h5"
          >
            {answer.nickName}
          </Typography>
        </CardContent>
        <CardContent
          style={{
            height: "80px",
            overflow: "hidden",
            backgroundColor: "#FFE673",
            padding: 20,
            margin: "5px 20px", // Adjust the margins here
            borderRadius: 15,
          }}
          onClick={handleCardClick}
        >
          <TruncatedText text={answer.content} maxLength={70} />
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
