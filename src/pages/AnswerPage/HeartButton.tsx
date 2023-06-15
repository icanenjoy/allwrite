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
}

const HeartButton: React.FC<HeartButtonProps> = ({ likeCount, isLiked }) => {
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
            console.log(response.data);
            alert("좋아요 성공");
            setCount((prev) => prev + 1);
            setClicked((prev) => !prev);
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
            alert("좋아요 취소 성공");
            setCount((prev) => prev - 1);
            setClicked((prev) => !prev);
          })
          .catch((e) => alert(e));
      }
    } catch (error) {
      console.log(error);
    }
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
