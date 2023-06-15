import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodayAnswer from "../../common/TodayAnswer";
import Calendar from "./Calendar";
import MainProfileImg from "../../asset/img/croco.png";
import ProfileImgAngry from "../../asset/img/crocoangry.png";
import ProfileImgSad from "../../asset/img/crocosad.png";
import ProfileImgLove from "../../asset/img/crocolove.png";
import ProfileImgLoveLock from "../../asset/img/crocolovelock.png";
import ProfileImgSadLock from "../../asset/img/crocosadlock.png";
import ProfileImgAngryLock from "../../asset/img/crocoangrylock.png";
import axios from "axios";
import rightAnimals from "../../asset/img/rightAnimals.png";
import leftAnimals from "../../asset/img/leftAnimals.png";

import HeaderBar from "../../common/HeaderBar";
import { useLocalStorage } from "usehooks-ts";
import jwt_decode from "jwt-decode";
import userEvent from "@testing-library/user-event";
import FooterImage from "./FooterImage";
import DoneIcon from "@mui/icons-material/Done";

function Main() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const [mainImg, setMainImg] = useState<any | null>(null);
  const [angryImg, setAngryImg] = useState<any | null>(null);
  const [sadImg, setSadImg] = useState<any | null>(null);
  const [loveImg, setLoveImg] = useState<any | null>(null);
  const [emotion, setEmotion] = useState<any | null>(null);
  const formattedDate = `${year}-${month}-${day}`;
  const [containerWidth, setContainerWidth] = useState(0);

  const [user, setUser] = useState<any | null>(null);
  const [level, setLevel] = useState<any | null>(null);
  const [exp, setExp] = useState<number | null>(null);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (accessToken !== null) {
          // console.log(accessToken);
          console.log(jwt_decode(accessToken));
          setUser(jwt_decode(accessToken));
        }
      } catch (e) {
        console.error("Token decoding error:", e);
      }
    };
    checkToken();
  }, []);

  async function changeProfile(emotion: string) {
    try {
      const response = await axios.post(
        `https://allwrite.kro.kr/api/v1/emotion/${formattedDate}`,
        {
          emotion: emotion,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async function changeProfile2() {
    console.log(String(angryImg));
    if (angryImg.includes("lock")) {
      alert("선택할 수 없습니다!");
    } else {
      await changeProfile("angry");
    }
  }

  async function changeProfile3() {
    console.log(sadImg);
    if (sadImg.includes("lock")) {
      alert("레벨 15 이상 사용이 가능합니다!");
    } else {
      await changeProfile("sad");
    }
  }

  async function changeProfile4() {
    console.log(loveImg);
    if (loveImg.includes("lock")) {
      alert("레벨 20 이상 사용이 가능합니다!");
    } else {
      await changeProfile("love");
    }
  }
  useEffect(() => {
    axios
      .get("https://allwrite.kro.kr/api/v1/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLevel(response.data.level);
        setExp(response.data.currentExp);
        if (Number(response.data.level) < 5) {
          setAngryImg(ProfileImgAngryLock);
          setSadImg(ProfileImgSadLock);
          setLoveImg(ProfileImgLoveLock);
        } else if (Number(response.data.level) < 10) {
          setAngryImg(ProfileImgAngry);
          setSadImg(ProfileImgSadLock);
          setLoveImg(ProfileImgLoveLock);
        } else if (Number(response.data.level) < 15) {
          setAngryImg(ProfileImgAngry);
          setSadImg(ProfileImgSad);
          setLoveImg(ProfileImgLoveLock);
        } else if (Number(response.data.level) < 20) {
          setAngryImg(ProfileImgAngry);
          setSadImg(ProfileImgSad);
          setLoveImg(ProfileImgLove);
        }
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainerWidth(Number(exp) || 0);
    }, 700);

    return () => clearTimeout(timeout);
  }, [exp]);

  useEffect(() => {
    axios
      .get(`https://allwrite.kro.kr/api/v1/emotion/${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.emotion === "angry") {
          setMainImg(ProfileImgAngry);
        } else if (response.data.emotion === "sad") {
          setMainImg(ProfileImgSad);
        } else if (response.data.emotion === "love") {
          setMainImg(ProfileImgLove);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <Container1>
        <Profile style={{ backgroundImage: `url(${mainImg})` }}></Profile>
        <AngryProfile
          style={{ backgroundImage: `url(${angryImg})` }}
          onClick={changeProfile2}
        ></AngryProfile>
        <SadProfile
          style={{ backgroundImage: `url(${sadImg})` }}
          onClick={changeProfile3}
        ></SadProfile>
        <LoveProfile
          style={{ backgroundImage: `url(${loveImg})` }}
          onClick={changeProfile4}
        ></LoveProfile>
        <Name>{user && <div>{user.nickName}</div>}</Name>
        {/* <Save>
          <DoneIcon />
        </Save> */}
        <Level>LV {level}</Level>
        <Container>
          <Progress
            style={{ width: `${containerWidth}%` }} // Set the width dynamically
          ></Progress>
        </Container>
        <Question>오늘의 질문</Question>
        <TodayAnswer />
      </Container1>
      <Container2></Container2>
      <Container3>
        <Calendar />
        <BestAnswerContainer></BestAnswerContainer>
      </Container3>
      <FooterImage
        leftSrc={leftAnimals}
        leftAlt="왼쪽 동물들"
        rightSrc={rightAnimals}
        rightAlt="오른쪽 동물들"
      />
    </>
  );
}

export default Main;

const Container1 = styled.div`
  width: 100%;
  height: 35rem;
  margin-top: 150px;

  text-align: center;
`;

const Profile = styled.button`
  height: 12rem;
  width: 12rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  margin-top: 2rem;
  background-size: 100% 100%;
  background-color: transparent;
  background-repeat: no-repeat;
  background-image: url(${MainProfileImg});
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const SadProfile = styled.button`
  height: 7rem;
  width: 7rem;
  border: none;
  border-radius: 1rem;
  margin-top: 12rem;
  margin-left: 15rem;
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: transparent;
  transition: transform 0.3s;
  /* background-color: red; */

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const LoveProfile = styled.button`
  height: 7rem;
  width: 7rem;
  background-size: 100% 100%;
  border: none;
  border-radius: 1rem;
  margin-top: 3rem;
  margin-left: 10rem;
  position: absolute;
  background-color: transparent;
  background-repeat: no-repeat;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const AngryProfile = styled.button`
  height: 7rem;
  width: 8rem;
  background-size: 100% 100%;
  border: none;
  border-radius: 1rem;
  margin-top: 11rem;
  margin-left: -30rem;
  position: absolute;
  background-color: transparent;
  background-repeat: no-repeat;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;
// const Save = styled.button`
//   height: 2rem;
//   width: 2.4rem;
//   overflow: visible;
//   color: #c55c0c;
//   background-color: #f09936;
//   font-weight: 550;
//   border: none;
//   border-radius: 10rem;
//   &:hover {
//     transform: scale(1.05);
//     overflow: hidden;
//     background-color: #f3ad5e;
//     cursor: pointer;
//   }
// `;

const Name = styled.div`
  font-size: 1.7rem;
  height: 3rem;
  width: 100%;
  overflow: visible;
  margin-top: 2rem;
  color: #ea9f27;
  font-weight: 750;
`;

const Level = styled.div`
  font-size: 1.2rem;
  height: 1rem;
  width: 100%;
  overflow: visible;
  position: absoulte;
  margin-top: 1rem;
  color: #ea9f27;
  font-weight: 750;
`;

const Container = styled.div`
  margin: 10px auto;
  background-color: #e8e3e3;
  width: 30rem;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  transition: width 1s; // Add transition for width changes
`;

const Progress = styled.div`
  background-color: #f9aa43;
  width: ${(props) => props.style?.width || 0}%;
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

//프로그레스 바에 원 달아서 프로그레스 바가 차오를 때 같이 차오름

const Container2 = styled.div`
  width: 100%;
  height: 6rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #ea9f27;
  font-weight: 750;
`;

const Question = styled.div`
  font-size: 1.2rem;
  height: 2rem;
  width: 100%;
  overflow: visible;
  position: absoulte;
  margin-top: 4rem;
  color: #ea9f27;
  font-weight: 750;
`;

const Container3 = styled.div`
  width: 50%;
  height: 27rem;
  display: flex;
  justify-content: right;
  position: relative;
  text-align: right;
`;

const BestAnswerContainer = styled.div`
  height: 30rem;
  width: 1rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #ea9f27;
  font-weight: 750;
`;
