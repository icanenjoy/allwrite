import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import styled from "styled-components";
import profileImg from "../../asset/img/profileImg.png";
import Calendar from "../MainPage/Calendar";
import jwtDecode from "jwt-decode";

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
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

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
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      {
        profile && setContainerWidth(parseInt(profile.currentExp));
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [profile]);

  const getMyProfile = async () => {
    setmyprofile(true);
    try {
      const response = await axios.get("http://34.64.145.63:5000/api/v1/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFriendProfile = async () => {
    setmyprofile(false);
    try {
      let response = await axios.post(
        "http://34.64.145.63:5000/api/v1/friend/relation",
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
        `http://34.64.145.63:5000/api/v1/user/${nickName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleProfileChange = () => {
    //수정 버튼
  };

  const handleStopFriend = async () => {
    //친구끊기
    try {
      const response = await axios.delete(
        `http://34.64.145.63:5000/api/v1/friend/${nickName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFriendReqOk = async () => {
    //친구수락
    try {
      const response = await axios.post(
        "http://34.64.145.63:5000/api/v1/friend/response",
        {
          friendNickName: nickName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFriendReqdel = async () => {
    //친구거절
    try {
      const response = await axios.delete(
        "http://34.64.145.63:5000/api/v1/friend/reject",
        {
          data: {
            friendNickName: nickName,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };
  const handleFriendRes = async () => {
    //친구요청보내기
    try {
      const response = await axios.post(
        "http://34.64.145.63:5000/api/v1/friend/request",
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
      console.log(response);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };
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
            {myprofile && <EditBtn onClick={handleProfileChange}>수정</EditBtn>}
            {!myprofile && <ProfileBox />}
            <Profile
              style={{
                backgroundImage: `url(${profile && profile.profileImage})`,
              }}
            />
            <Name>{profile && profile.nickName}</Name>
            <Level>{profile && profile.level}LV</Level>
            <Container2>
              <Progress style={{ width: `${containerWidth}%` }}></Progress>
            </Container2>
            {!myprofile && <ProfileButton />}
          </Profiles>
        </LeftContainer>
        <StyledCalendar />
      </Container>
    </>
  );
}

export default MyPage;

const StyledCalendar = styled(Calendar)`
  color: black; // 원하는 색상으로 변경해주세요.
`;

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
`;

const Profiles = styled.div`
  width: 25rem;
  height: 45rem;
  display: block;

  border-radius: 4rem;
  justify-content: center;
  background-color: #faaf2e;
`;

const ProfileBox = styled.div`
  margin-top: 5rem;
  background-color: #000;
`;

const EditBtn = styled.button`
  width: 4rem;
  height: 2rem;
  margin-top: 2rem;
  margin-left: 19.5rem;
  display: flex;
  border-radius: 1rem;
  border: none;
  color: #f30000;
  background-color: #fa7f3d;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
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
  background-color: #2c9960;
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
