import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { HeartButtonProps } from "./PostCardProps";

const HeartButton: React.FC<HeartButtonProps> = ({ answer_id }) => {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);

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
          `http://34.64.145.63:5000/api/v1/answer/like/${answer_id}`
        );
      } else {
        await axios.post(
          `http://34.64.145.63:5000/api/v1/answer/like/${answer_id}`
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
