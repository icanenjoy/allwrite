import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface HeartButtonProps {
  onClick: () => void;
  clicked: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick, clicked }) => {
  // Heart 상태값이 바뀔때마다 요청을 보내는 코드가 추가될 예정
  return (
    <IconButton onClick={onClick}>
      {clicked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default HeartButton;
