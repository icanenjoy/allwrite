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
      alert("친구끊기");
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
      alert("친구수락");
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
      alert("친구거절");
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
      alert("친구요청보냄");
    } catch (e) {
      console.error(e);
    }
  };
  const ProfileButton = () => {
    if (relation.isFriend) {
      return (
        <Button variant="contained" onClick={handleStopFriend}>
          친구끊기
        </Button>
      );
    } else {
      if (relation.isReqFriend) {
        return <Button variant="contained">친구요청중</Button>;
      } else {
        if (relation.isResFriend) {
          return (
            <>
              <Button variant="contained" onClick={handleFriendReqOk}>
                친구수락
              </Button>
              <Button
                sx={{
                  marginLeft: 2,
                  backgroundColor: "red",
                  borderRadius: "2rem",
                }}
                variant="contained"
                onClick={handleFriendReqdel}
              >
                친구거절
              </Button>
            </>
          );
        } else {
          return (
            <Button variant="contained" onClick={handleFriendRes}>
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
            <Profile
            // style={{ backgroundImage: `url(${profile.profileImage})` }}
            />
            <Name>{profile.nickName}</Name>
            <Level>LV 18</Level>
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
  margin-top: 10rem;
`;

const LeftContainer = styled.div`
  width: 48rem;
  height: 50rem;
  display: flex;
  justify-content: center;
`;

const Profiles = styled.div`
  width: 25rem;
  height: 45rem;
  display: block;
  margin-left: 5rem;
  border-radius: 4rem;
  justify-content: center;
  background-color: #faaf2e;
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
  margin-top: 1rem;
`;

const Profile = styled.div`
  width: 10rem;
  height: 10rem;
  margin-left: 7.5rem;
  margin-top: 1rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;
