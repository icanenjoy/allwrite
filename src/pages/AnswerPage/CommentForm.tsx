import React, { useState, useEffect } from "react";
import { CommentFormProps, Comment } from "./PostCardProps";
import axios from "axios";
import {
  Avatar,
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { Report, Delete, Edit, Save } from "@mui/icons-material"; // Import the Edit and Save icons
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocalStorage } from "usehooks-ts";
import jwtDecode from "jwt-decode";

const CommentForm: React.FC<CommentFormProps> = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false); // State to track edit mode
  const [editComment, setEditComment] = useState<string>(""); // State for edited comment
  const [editedCommentId, setEditedCommentId] = useState<string | null>(null); // State to track the comment being edited
  const questionId = useSelector((state: RootState) => state.questionId);
  const answerId = useSelector((state: RootState) => state.answerId);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "rt",
    null
  );
  const [reportedCommentId, setReportedCommentId] = useState<string | null>(
    null
  );
  const myNickName: string | null = accessToken
    ? jwtDecode<{ nickName: string }>(accessToken).nickName
    : null;

  useEffect(() => {
    axios
      .get<{ comments: { comment: Comment[] }[] }>(
        `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const extractedComments = response.data.comments[0].comment.map(
          (comment: Comment) => {
            return {
              _id: comment._id,
              nickName: comment.nickName,
              profileImage: comment.profileImage,
              content: comment.content,
              createdAt: comment.createdAt,
              reportCount: comment.reportCount,
            };
          }
        );
        setComments(extractedComments);
      })
      .catch((error) => {});
  }, [answerId, questionId, accessToken]);

  const handleSubmit = () => {
    const newCommentObj = {
      content: newComment,
      reportCount: 0,
    };
    axios
      .post(
        `https://allwrite.kro.kr/api/v1/answer/comment/${answerId}`,
        newCommentObj,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        alert("댓글 작성 성공");
        setNewComment("");
        axios
          .get<{ comments: { comment: Comment[] }[] }>(
            `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            const extractedComments = response.data.comments[0].comment.map(
              (comment: Comment) => {
                return {
                  _id: comment._id,
                  nickName: comment.nickName,
                  profileImage: comment.profileImage,
                  content: comment.content,
                  createdAt: comment.createdAt,
                  reportCount: comment.reportCount,
                };
              }
            );
            setComments(extractedComments);
          })
          .catch((error) => {});
      })
      .catch((e) => alert(e));
  };

  const handleReport = (index: number) => {
    const commentId = comments[index]._id;
    setReportedCommentId(commentId);
    axios
      .post(
        `https://allwrite.kro.kr/api/v1/answer/comment/complaint/${answerId}/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => alert("댓글 신고 성공"))
      .catch((e) => {
        alert(e);
      });
  };

  const handleDelete = (index: number) => {
    const commentId = comments[index]._id;
    axios
      .delete(
        `https://allwrite.kro.kr/api/v1/answer/comment/${answerId}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        alert("댓글 삭제 성공");
        axios
          .get<{ comments: { comment: Comment[] }[] }>(
            `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            const extractedComments = response.data.comments[0].comment.map(
              (comment: Comment) => {
                return {
                  _id: comment._id,
                  nickName: comment.nickName,
                  profileImage: comment.profileImage,
                  content: comment.content,
                  createdAt: comment.createdAt,
                  reportCount: comment.reportCount,
                };
              }
            );
            setComments(extractedComments);
          })
          .catch((error) => {});
      })
      .catch((e) => alert(e));
  };

  const handleEdit = (index: number) => {
    const commentId = comments[index]._id;
    setEditedCommentId(commentId);
    setEditComment(comments[index].content);
    setEditMode(true);
  };

  const handleSave = () => {
    if (editedCommentId) {
      const updatedCommentObj = {
        content: editComment,
      };
      axios
        .put(
          `https://allwrite.kro.kr/api/v1/answer/comment/${answerId}/${editedCommentId}`,
          updatedCommentObj,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          alert("댓글 수정 성공");
          setEditComment("");
          setEditedCommentId(null);
          setEditMode(false);
          axios
            .get<{ comments: { comment: Comment[] }[] }>(
              `https://allwrite.kro.kr/api/v1/question/answer/detail/${questionId}/${answerId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              const extractedComments = response.data.comments[0].comment.map(
                (comment: Comment) => {
                  return {
                    _id: comment._id,
                    nickName: comment.nickName,
                    profileImage: comment.profileImage,
                    content: comment.content,
                    createdAt: comment.createdAt,
                    reportCount: comment.reportCount,
                  };
                }
              );
              setComments(extractedComments);
            })
            .catch((error) => {});
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        width: "23rem",
        marginTop: "2rem",
        backgroundColor: "white",
        borderRadius: "1rem",
      }}
    >
      <Stack spacing={2} sx={{ marginBottom: 5 }}>
        {comments &&
          comments.map((comment, index) => (
            <Box key={index} display="flex" alignItems="center">
              <Avatar src={comment.profileImage} alt={comment.nickName} />
              <Box>
                {!editMode ? ( // Render the comment or the edit form based on editMode state
                  <Typography
                    sx={{
                      ml: 2,
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      fontFamily: "Pretendard-Regular",
                    }}
                  >
                    {comment.content}
                  </Typography>
                ) : (
                  <TextField
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    sx={{
                      ml: 2,
                      width: "100%",
                      fontFamily: "GmarketSansMedium",
                    }}
                  />
                )}
                <Typography
                  variant="caption"
                  sx={{ ml: 2, fontFamily: "GmarketSansMedium" }}
                >
                  {comment.nickName} | {comment.createdAt.slice(0, 10)} | 신고 :{" "}
                  {comment.reportCount}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleReport(index)}>
                <Report
                  sx={{
                    marginLeft: "1rem",
                    color: "#f93707",
                    "&:hover": {
                      color: "#74210d", // 원하는 호버 시 색상으로 변경
                    },
                  }}
                />
              </IconButton>
              {myNickName === comment.nickName && (
                <>
                  {!editMode ? ( // Render the edit button or the save button based on editMode state
                    <IconButton size="small" onClick={() => handleEdit(index)}>
                      <Edit
                        sx={{
                          color: "#1bb36a",
                          "&:hover": {
                            color: "#088118", // 원하는 호버 시 색상으로 변경
                          },
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton size="small" onClick={handleSave}>
                      <Save
                        sx={{
                          color: "#1bb36a",
                          "&:hover": {
                            color: "#088118", // 원하는 호버 시 색상으로 변경
                          },
                        }}
                      />
                    </IconButton>
                  )}
                  <IconButton size="small" onClick={() => handleDelete(index)}>
                    <Delete
                      sx={{
                        color: "#1bb36a",
                        "&:hover": {
                          color: "#f53809", // 원하는 호버 시 색상으로 변경
                        },
                      }}
                    />
                  </IconButton>
                </>
              )}
            </Box>
          ))}
      </Stack>
      <TextField
        label="댓글 작성"
        variant="outlined"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ width: "80%", height: "5rem" }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          width: "20%",
          height: 55,
          backgroundColor: "#1bb36a",
          "&:hover": {
            backgroundColor: "#0c7643", // 원하는 호버 시 색상으로 변경
          },
        }}
      >
        등록
      </Button>
    </Paper>
  );
};

export default CommentForm;
