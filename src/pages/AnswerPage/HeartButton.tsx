import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const HeartButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <IconButton onClick={handleClick}>
      {clicked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default HeartButton;
