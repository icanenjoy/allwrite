import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface HeartButtonProps {
  onClick: () => void;
  clicked: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick, clicked }) => {
  return (
    <IconButton onClick={onClick}>
      {clicked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default HeartButton;
