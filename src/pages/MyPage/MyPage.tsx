import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import styled from "styled-components";
import profileImg from "../../asset/img/profileImg.png";

import jwtDecode from "jwt-decode";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Box, Typography } from "@mui/material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setAnswerId, setQuestionId } from "../../store";
import { AnswerDetail } from "../AnswerPage/AnswerDetail";

function MyPage() {
  const Relation = {
    isFriend: false,
    isReqFriend: false,
    isResFriend: false,
  };

  interface Relation {
    isFriend: boolean;
    isReqFriend: boolean;
    isResFriend: boolean;
  }
  const location = useLocation();
  const [containerWidth, setContainerWidth] = useState(0);
  const [nickName, setNickName] = useState(""); // 페이지 유저아이디
  const [profile, setProfile] = useState<any | null>(); //페이지 유저정보 가져오기
  const [myprofile, setmyprofile] = useState(false); //본인인지 상대 페이지 인지 구분
  const [relation, setRelation] = useState<Relation>(Relation); //친구와의 관계
  const [user, setUser] = useState<any | null>("");
  const [newAnswerId, setNewAnswerId] = useState("");
  const [newQuestionId, setNewQuestionId] = useState("");
  const [question, setQuestion] = useState<any | null>([]);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수를 가져옴

  const answerId = useSelector((state: RootState) => state.answerId);
  const questionId = useSelector((state: RootState) => state.questionId);

  const [photoopen, setPhotoOpen] = useState(false);

  const handleOpenModal = () => {
    setPhotoOpen(true);
  };

  const handleCloseModal = () => {
    setPhotoOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    //주소바뀔때 아이디값 받아오기
    const searchParams = new URLSearchParams(location.search);
    const nickName = searchParams.get("nickName");
    setNickName(nickName || "");
    if (accessToken !== null) setUser(jwtDecode(accessToken));
  }, [location]);

  useEffect(() => {
    if (nickName === user.nickName) {
      getMyProfile();
    } else if (nickName) {
      getFriendProfile();
    }
    getQuestion();
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      {
        profile && setContainerWidth(parseInt(profile.currentExp));
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [profile]);

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `https://allwrite.kro.kr/api/v1/question/answer/user/${nickName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuestion(response.data);
    } catch (e) {}
  };

  const handleClickOpen = (qId: string, ansId: string) => {
    //버튼클릭
    dispatch(setQuestionId(qId));
    dispatch(setAnswerId(ansId));
    setOpen(true);
  };

  const getMyProfile = async () => {
    setmyprofile(true);
    try {
      const response = await axios.get(`https://allwrite.kro.kr/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(response.data);
    } catch (e) {}
  };

  const getFriendProfile = async () => {
    setmyprofile(false);
    try {
      let response = await axios.post(
        `https://allwrite.kro.kr/api/v1/friend/relation`,
        {
          friendNickName: nickName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRelation(response.data);

      response = await axios.get(
        `https://allwrite.kro.kr/api/v1/user/${nickName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
    } catch (e) {}
  };

  const handleProfileChange = () => {
    //수정 버튼
  };

  const handleStopFriend = async () => {
    //친구끊기
    try {
      const response = await axios.delete(
        `https://allwrite.kro.kr/api/v1/friend/${nickName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFriendReqOk = async () => {
    //친구수락
    try {
      const response = await axios.post(
        "https://allwrite.kro.kr/api/v1/friend/response",
        {
          friendNickName: nickName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (e) {}
  };

  const handleFriendReqdel = async () => {
    //친구거절
    try {
      const response = await axios.delete(
        "https://allwrite.kro.kr/api/v1/friend/reject",
        {
          data: {
            friendNickName: nickName,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (e) {}
  };
  const handleFriendRes = async () => {
    //친구요청보내기
    try {
      const response = await axios.post(
        "https://allwrite.kro.kr/api/v1/friend/request",
        {
          friendNickName: nickName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };
  function FileUpload() {
    const onDrop = useCallback(async (acceptedFiles: any) => {
      try {
        const formData = new FormData();
        formData.append("profileImage", acceptedFiles[0]);

        const response = await axios.post(
          "https://allwrite.kro.kr/api/v1/user/profileImage",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // 파일 업로드 성공 처리
        window.location.reload();
      } catch (error) {
        // 오류 처리
        console.error("파일 업로드 오류:", error);
      }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <Box
        {...getRootProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderWidth: 2,
          borderRadius: 1,
          borderColor: "primary.main",
          backgroundColor: "primary.light",
          color: "primary.dark",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">사진올리기</Typography>
        ) : (
          <Typography variant="body1">사진올리기</Typography>
        )}
      </Box>
    );
  }
  const ProfileButton = () => {
    if (relation.isFriend) {
      return (
        <Button
          sx={ProfileFriendButton}
          variant="contained"
          onClick={handleStopFriend}
        >
          친구끊기
        </Button>
      );
    } else {
      if (relation.isReqFriend) {
        return (
          <Button sx={ProfileFriendButton} variant="contained">
            친구요청중
          </Button>
        );
      } else {
        if (relation.isResFriend) {
          return (
            <>
              <Button
                sx={ProfileFriendButton}
                variant="contained"
                onClick={handleFriendReqOk}
              >
                친구수락
              </Button>
              <Button
                sx={ProfileFriendButton2}
                variant="contained"
                onClick={handleFriendReqdel}
              >
                친구거절
              </Button>
            </>
          );
        } else {
          return (
            <Button
              sx={ProfileFriendButton}
              variant="contained"
              onClick={handleFriendRes}
            >
              친구요청보내기
            </Button>
          );
        }
      }
    }
  };

  return (
    <>
      <Container>
        <LeftContainer>
          <Profiles>
            <ProfileBox />
            <Profile
              style={{
                backgroundImage: `url(${profile && profile.profileImage})`,
              }}
            />
            {myprofile && (
              <IconButton
                size="small"
                sx={{
                  width: 35,
                  height: 35,
                  marginTop: -20,
                  marginBottom: -10,
                  marginLeft: 13,
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#eaebed", // 원하는 호버 시 색상으로 변경
                  },
                }}
                onClick={handleOpenModal}
              >
                <EditIcon
                  sx={{
                    position: "absolute",
                  }}
                />
              </IconButton>
            )}
            <Dialog open={photoopen} onClose={handleCloseModal}>
              <DialogContent>
                <FileUpload />
              </DialogContent>
            </Dialog>
            <Name>{profile && profile.nickName}</Name>
            <Level>LV{profile && profile.level}</Level>
            <Container2>
              <Progress style={{ width: `${containerWidth}%` }}></Progress>
            </Container2>
            {!myprofile && <ProfileButton />}
          </Profiles>
        </LeftContainer>
        <BottonContainer>
          {question.map((question: any, index: string) => (
            <Button
              key={index}
              sx={questionButton}
              onClick={() => handleClickOpen(question.questionId, question._id)}
            >
              <p>{question.question}</p>
            </Button>
          ))}
        </BottonContainer>
      </Container>
      {open && <AnswerDetail nickName={nickName} onClose={handleClose} />}
    </>
  );
}

export default MyPage;

const Container = styled.div`
  width: 100rem;
  height: 40rem;
  text-align: center;
  display: flex;
  margin-top: 6rem;
`;

const LeftContainer = styled.div`
  width: 35rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  margin-left: 8rem;
  margin-right: 6rem;
`;

const Profiles = styled.div`
  width: 25rem;
  height: 45rem;
  display: block;

  border-radius: 4rem;
  justify-content: center;
  background-color: #1bb36a;
`;

const ProfileBox = styled.div`
  margin-top: 5rem;
  background-color: #000;
`;

const Name = styled.div`
  width: 10rem;
  height: 1rem;
  margin-left: 7.5rem;
  margin-top: 1rem;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Level = styled.div`
  width: 10rem;
  height: 1rem;
  margin-left: 7.5rem;
  margin-top: 1.5rem;
`;
const Container2 = styled.div`
  margin: 10px auto;
  background-color: #e8e3e3;
  width: 20rem;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  transition: width 1s; // Add transition for width changes
`;

const Progress = styled.div`
  background-color: #f99f04;
  width: ${(props) => props.style?.width || 0}%;
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

const Profile = styled.div`
  width: 10rem;
  height: 10rem;
  margin-left: 7.5rem;
  margin-top: 1rem;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-size: 100% 100%;
`;

const ProfileFriendButton = {
  marginTop: 2,
  marginLeft: 0.5,
  backgroundColor: "#2c9960",
  borderRadius: "2rem",
  color: "#e8e3e3",
  "&:hover": {
    backgroundColor: "#1f7047",
    color: "white",
  },
};

const ProfileFriendButton2 = {
  marginTop: 2,
  marginLeft: 2,
  backgroundColor: "#2c9960",
  borderRadius: "2rem",
  color: "#e8e3e3",
  "&:hover": {
    backgroundColor: "#1f7047",
    color: "white",
  },
};

const questionButton = {
  display: "flex",
  alignItems: "center",
  marginLeft: "7rem",
  marginTop: "2.5rem",
  backgroundColor: "#2c9960",
  padding: "2rem",
  width: "27rem",
  height: "4rem",
  borderRadius: "1rem",
  color: "white",
  transition: "transform 0.3s",
  fontFamily: "GmarketSansMedium",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#2c9960",
  },
};

const BottonContainer = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
