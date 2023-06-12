import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";

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
  const [profile, setProfile] = useState(); //페이지 유저정보 가져오기
  const [myprofile, setmyprofile] = useState(false); //본인인지 상대 페이지 인지 구분
  const [relation, setRelation] = useState<Relation>(Relation); //친구와의 관계

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  ); // accessToken

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nickName = searchParams.get("nickName");
    setNickName(nickName || "");
    console.log(nickName);
  }, [location]);

  useEffect(() => {
    if (nickName === "") getMyProfile();
    else getFriendProfile();
  }, [nickName]);

  const getMyProfile = () => {
    setmyprofile(true);
  };

  const getFriendProfile = async () => {
    setmyprofile(false);
    try {
      const response = await axios.post(
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
    if (myprofile) {
      return (
        <Button variant="contained" onClick={handleProfileChange}>
          수정
        </Button>
      );
    } else {
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
                <Button variant="contained" onClick={handleFriendReqdel}>
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
    }
  };

  return <ProfileButton />;
}

export default MyPage;
