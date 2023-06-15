import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

import React, { useState } from "react";
import HeartButton from "./HeartButton";
import TruncatedText from "./TextSlicer";
import { Height, Translate } from "@mui/icons-material";
import { AnswerDetail } from "./AnswerDetail";
import { PostCardProps, HeartButtonProps } from "./PostCardProps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setAnswerId } from "../../store";

interface StyledCardProps {
  isWriteAnswer: boolean;
}

const HoverCard = styled(Card)<StyledCardProps>`
  height: 350px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const PostCard: React.FC<PostCardProps> = (answer: PostCardProps) => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const answerId = useSelector((state: RootState) => state.answerId);

  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수를 가져옴

  const handleCardClick = () => {
    if (!answer.isWriteAnswer) {
      alert("답변을 작성하셔야 다른 사람들의 게시글을 확인할 수 있습니다.");
      return;
    }

    dispatch(setAnswerId(answer.answer_id));
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
    navigate(`/mypage/?nickName=${answer.nickName}`);
  };

  return (
    <>
      <HoverCard
        isWriteAnswer={answer.isWriteAnswer}
        sx={{
          backgroundColor: "#FFCF53",
          borderRadius: 6,
          ...(answer.isWriteAnswer ? {} : { filter: "blur(4px)" }),
        }}
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
        {answer.isWriteAnswer ? (
          <CardContent
            style={{
              height: "80px",
              overflow: "hidden",
              backgroundColor: "#FFE673",
              padding: 20,
              margin: "5px 20px", // 조정하고자 하는 마진 값으로 수정해주세요
              borderRadius: 15,
            }}
            onClick={handleCardClick}
          >
            <TruncatedText text={answer.content} maxLength={70} />
          </CardContent>
        ) : (
          <CardContent
            style={{
              height: "80px",
              overflow: "hidden",
              backgroundColor: "#FFE673",
              padding: 20,
              margin: "5px 20px", // 조정하고자 하는 마진 값으로 수정해주세요
              borderRadius: 15,
              filter: "blur(4px)",
            }}
            onClick={handleCardClick}
          >
            <TruncatedText text={answer.content} maxLength={70} />
          </CardContent>
        )}
        {/* <CardContent>
          <HeartButton answer_id={answer.answer_id} />
        </CardContent> */}
      </HoverCard>

      {open && (
        <AnswerDetail
          answer_id={answer.answer_id}
          content={answer.content}
          nickName={answer.nickName}
          onClose={handleClose}
          likeCount={answer.likeCount}
        />
      )}
    </>
  );
};

export default PostCard;
