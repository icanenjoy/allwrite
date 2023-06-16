import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Grid,
} from "@mui/material";

const AdminPage = () => {
  const [adminchange, setAdminChange] = useState(true);
  const [user, setUser] = useState<any | null>([]);
  const [question, setQuestion] = useState<any | null>([]);
  const [questionopen, setQuestionOpen] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [qusetionid, setQuestionId] = useState("");
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );

  useEffect(() => {
    const firstdata = async () => {
      try {
        let response = await axios.get(
          "https://allwrite.kro.kr/api/v1/adminUser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data[0]);

        response = await axios.get(
          "https://allwrite.kro.kr/api/v1/question/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setQuestion(response.data);
      } catch (e) {}
    };

    firstdata();
  }, []);

  const handleUserClick = () => {
    //user버튼
    setAdminChange(true);
  };

  const handleQuestionClick = () => {
    //질문버튼
    setAdminChange(false);
  };

  const handleClickOpen = (question: string, qId: string) => {
    //버튼클릭
    setQuestionOpen(true); //모달열기
    setQuestionId(qId);
    setButtonText(question);
  };

  const handleClose = () => {
    //모달닫기
    setQuestionOpen(false);
  };

  const handleSave = () => {
    setQuestionOpen(false);

    const changeque = async () => {
      try {
        const response = await axios.put(
          `https://allwrite.kro.kr/api/v1/question/${qusetionid}`,
          {
            content: buttonText,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (e) {}
    };

    changeque();
  };

  const handleTextChange = (event: any) => {
    setButtonText(event.target.value);
  };

  return (
    <Container>
      <UpContainer>
        <EditBtn onClick={handleUserClick}>user</EditBtn>
        <EditBtn onClick={handleQuestionClick}>질문</EditBtn>
      </UpContainer>

      {adminchange ? (
        <BottonContainer>
          <Grid container spacing={1}>
            {user.map((user: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <ListItem button sx={{ marginLeft: 4 }} onClick={() => {}}>
                  <ListItemIcon sx={{ width: 40, height: 40 }}>
                    <img
                      src={user.profileImage}
                      alt={user.nickName}
                      style={{ borderRadius: "50%", width: 40, height: 40 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={user.nickName} />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </BottonContainer>
      ) : (
        <BottonContainer>
          <Grid container spacing={1}>
            {question.map((question: any, index: string) => (
              <Grid item sm={12} md={6} lg={4} key={index}>
                <Button
                  key={index}
                  sx={questionButton}
                  onClick={() =>
                    handleClickOpen(question.content, question._id)
                  }
                >
                  <p>{question.content}</p>
                </Button>
              </Grid>
            ))}
            <Dialog open={questionopen} onClose={handleClose}>
              <DialogContent sx={DialogCss}>
                <TextField
                  label="질문수정"
                  value={buttonText}
                  onChange={handleTextChange}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  저장
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </BottonContainer>
      )}
    </Container>
  );
};

export default AdminPage;

const Container = styled.div`
  height: 40rem;
  text-align: center;
  display: block;
  margin-top: 0rem;
  width: 100%;
  overflow: auto;
`;

const UpContainer = styled.div`
  height: 10rem;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;
const BottonContainer = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EditBtn = styled.button`
  width: 6rem;
  height: 5rem;
  margin-top: 2rem;
  margin-left: 0.5rem;
  background-color: #2c9960;
  border-radius: 2rem;
  color: #e8e3e3;
  z-index: 999;
  &:hover {
    background-color: #1f7047;
    color: white;
  }
`;

const questionButton = {
  display: "flex",
  alignItems: "center",
  marginLeft: "2rem",
  marginTop: "2.5rem",
  backgroundColor: "#f9aa43",
  padding: "2rem",
  width: "27rem",
  height: "4rem",
  borderRadius: "1rem",
  color: "#8d3e02",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#f9aa43",
  },
};

const DialogCss = {
  width: "40rem", // 원하는 가로 길이로 조정
};
