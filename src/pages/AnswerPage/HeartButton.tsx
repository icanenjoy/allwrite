import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { HeartButtonProps } from "./PostCardProps";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HeartButton: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const answerId = useSelector((state: RootState) => state.answerId);

  const handleHeartClick = () => {
    if (!clicked) {
      setCount((prev) => prev + 1);
    } else {
      setCount((prev) => prev - 1);
    }
    setClicked(!clicked);
  };

  const handleLike = async () => {
    try {
      if (clicked) {
        await axios.post(
          `https://allwrite.kro.kr/api/v1/answer/like/${answerId}`
        );
      } else {
        await axios.delete(
          `https://allwrite.kro.kr/api/v1/answer/like/${answerId}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => {
          handleHeartClick();
          handleLike();
        }}
      >
        {clicked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      {count}
    </>
  );
};

export default HeartButton;
