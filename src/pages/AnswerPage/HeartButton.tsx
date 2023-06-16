import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocalStorage } from "usehooks-ts";

interface HeartButtonProps {
  likeCount: number;
  isLiked: boolean;
  setData: Function;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  likeCount,
  isLiked,
  setData,
}) => {
  const [clicked, setClicked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const answerId = useSelector((state: RootState) => state.answerId);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );

  useEffect(() => {
    setClicked(isLiked);
    setCount(likeCount);
  });

  const handleLike = async () => {
    try {
      if (!clicked) {
        await axios
          .post(
            `https://allwrite.kro.kr/api/v1/answer/like/${answerId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            setData({ likeCount: likeCount + 1, isLiked: true });
          })
          .catch((e) => alert(e));
      } else {
        await axios
          .delete(`https://allwrite.kro.kr/api/v1/answer/like/${answerId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(() => {
            setData({ likeCount: likeCount - 1, isLiked: false });
          })
          .catch((e) => alert(e));
      }
    } catch (error) {}
  };

  return (
    <>
      <IconButton onClick={() => handleLike()}>
        {clicked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      {count}
    </>
  );
};

export default HeartButton;
