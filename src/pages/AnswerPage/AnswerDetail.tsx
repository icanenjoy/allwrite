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
import { Edit, Delete, Report, Save } from "@mui/icons-material";
import axios from "axios";
import HeartButton from "./HeartButton";
import { AnswerDetailProps } from "./PostCardProps";
import CommentForm from "./CommentForm";
import { useLocalStorage } from "usehooks-ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import jwtDecode from "jwt-decode";

export const AnswerDetail: React.FC<AnswerDetailProps> = ({
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
  const [editedContent, setEditedContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [data, setData] = useState<any>([]);
  const [isReported, setIsReported] = useState(false);
  const questionId = useSelector((state: RootState) => state.questionId);
  const answerId = useSelector((state: RootState) => state.answerId);
  const myNickName: string | null = accessToken
    ? jwtDecode<{ nickName: string }>(accessToken).nickName
    : null;
  //api/v1/adminUser/warning
  const [infiniteBlockCode, setInfiniteBlockCode] = useState(false);

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
  }, [questionId, infiniteBlockCode]);

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
        .then(() => window.location.reload())
        .catch((e) => alert(e));
    } else {
    }
  };

  const handleEdit = () => {
    if (isEditMode) {
      setIsSaving(true);
      axios
        .put(
          `https://allwrite.kro.kr/api/v1/question/answer/${questionId}/${answerId}`,
          { content: editedContent },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          alert("게시물이 수정되었습니다.");
          setIsEditMode(false);
          setIsSaving(false);
          // Perform any necessary updates with the response data
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
        })
        .catch((e) => {
          alert("게시물 수정에 실패했습니다.");
          setIsSaving(false);
          console.error(e);
        });
    } else {
      setIsEditMode(true);
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

  const infiniteBlock = () => {
    setInfiniteBlockCode((prev) => !prev);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      sx={{
        color: "#FFF3BA",
        maxWidth: 1000,
        margin: "auto", // 가운데 정렬
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "GangwonEdu_OTFBoldA",
      }}
    >
      <Paper
        sx={{
          fontFamily: "GangwonEdu_OTFBoldA",
          backgroundColor: "#1bb36a",
          width: "28rem",
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto", // 가운데 정렬
        }}
      >
        <Box
          sx={{
            fontFamily: "GangwonEdu_OTFBoldA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {nickName === myNickName && (
            <IconButton onClick={handleEdit} disabled={isSaving}>
              {isEditMode ? <Save /> : <Edit />}
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
            fontFamily: "GangwonEdu_OTFBoldA",
          }}
        >
          {isEditMode ? (
            <TextField
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              multiline
              fullWidth
            />
          ) : (
            data.answers &&
            data.answers.length > 0 && (
              <Typography
                sx={{ fontFamily: "GangwonEdu_OTFBoldA" }}
                variant="h6"
                textAlign="center"
              >
                {data.answers[0].content}
              </Typography>
            )
          )}
        </Box>

        <DialogContent sx={{ flex: 1 }}>
          <HeartButton
            likeCount={data.likeCount}
            isLiked={data.isLiked}
            setData={infiniteBlock}
          />
          <CommentForm />
        </DialogContent>
      </Paper>
    </Dialog>
  );
};
