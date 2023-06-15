import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Avatar,
  Box,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete, Report } from "@mui/icons-material";
import axios from "axios";
import HeartButton from "./HeartButton";
import { AnswerDetailProps } from "./PostCardProps";
import CommentForm from "./CommentForm";
import { useLocalStorage } from "usehooks-ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import jwtDecode from "jwt-decode";

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
  answer_id,
  content,
  onClose,
  nickName,
}) => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );
  const [data, setData] = useState<any>([]);
  const [isReported, setIsReported] = useState(false);
  const questionId = useSelector((state: RootState) => state.questionId);
  const answerId = useSelector((state: RootState) => state.answerId);
  const myNickName: string | null = accessToken
    ? jwtDecode<{ nickName: string }>(accessToken).nickName
    : null;
  //api/v1/adminUser/warning

  useEffect(() => {
    axios
      .get(
        `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => setData(response.data));
  }, [questionId]);

  const handleEdit = () => {
    // Handle edit logic here
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "괜찮은 게시글인 것 같은데 진짜 삭제하시게요?"
    );
    if (confirmed) {
      axios
        .delete(
          `https://allwrite.kro.kr/api/v1/question/answer/${questionId}/${answerId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => alert("게시물 삭제 성공"))
        .catch((e) => alert(e));
    } else {
    }
  };

  const handleReport = () => {
    if (!isReported) {
      axios
        .post(
          `https://allwrite.kro.kr/api/v1/question/answer/complaint/${questionId}/${answerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const warnData = { nickName: nickName };
          axios
            .post(
              `https://allwrite.kro.kr/api/v1/adminUser/warning`,
              warnData,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then(() => {
              alert("신고가 완료되었습니다.");
              setIsReported(true);
            })
            .catch((error) => {
              console.error("경고 전송 오류:", error);
            });
        })
        .catch((error) => {
          console.error("신고 처리 오류:", error);
        });
    } else {
      alert("신고는 한 번만 진행하실 수 있습니다.");
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      sx={{
        color: "#FFF3BA",
        height: "100%", // 최대 크기로 설정
        "& .MuiDialog-paper": {
          height: "100%", // 최대 크기로 설정
        },
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#FFF3BA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {nickName === myNickName && (
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
          )}
          {nickName === myNickName && (
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          )}
          <IconButton onClick={handleReport}>
            <Report />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <Typography variant="h6" textAlign="center">
            {content}
          </Typography>
        </Box>
        <DialogContent sx={{ flex: 1 }}>
          <HeartButton
            likeCount={data.likeCount}
            isLiked={data.isLiked}
            setData={setData}
          />
          <CommentForm />
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
