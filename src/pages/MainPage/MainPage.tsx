import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodayAnswer from "../../common/TodayAnswer";
import Calendar from "./Calendar";
import MainProfileImg from "../../asset/img/croco.png";
import ProfileImg2 from "../../asset/img/croco1.png";
import ProfileImg3 from "../../asset/img/croco2.png";
import ProfileImg4 from "../../asset/img/croco3.png";
import bgImg from "../../asset/img/bgImg.png";

import HeaderBar from "../../common/HeaderBar";
import { useLocalStorage } from "usehooks-ts";
import jwt_decode from "jwt-decode";

function Main() {
  const [count, setCount] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(MainProfileImg);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "at",
    null
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (accessToken !== null) {
          console.log(accessToken);
          console.log(jwt_decode(accessToken));
        }
      } catch (e) {
        console.error("Token decoding error:", e);
      }
    };

    checkToken();
  }, []);

  function add_count() {
    if (count === 5) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  function changeProfile2() {
    setSelectedProfile(ProfileImg2); // Set the selectedProfile to rabbit2
  }
  function changeProfile3() {
    setSelectedProfile(ProfileImg3); // Set the selectedProfile to rabbit2
  }
  function changeProfile4() {
    setSelectedProfile(ProfileImg4); // Set the selectedProfile to rabbit2
  }
  useEffect(() => {
    // Update the container width to its full width after a delay
    const timeout = setTimeout(() => {
      setContainerWidth(70);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Container1>
        <Profile
          style={{ backgroundImage: `url(${selectedProfile})` }}
        ></Profile>
        <LeftProfile onClick={changeProfile2}></LeftProfile>
        <RightProfile onClick={changeProfile3}></RightProfile>
        <TopProfile onClick={changeProfile4}></TopProfile>

        <Name>아거씨</Name>
        <Level>LV14</Level>
        <Container>
          <Progress
            style={{ width: `${containerWidth}%` }} // Set the width dynamically
            onClick={() => {
              add_count();
            }}
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
    </>
  );
}

export default Main;

const Container1 = styled.div`
  width: 100%;
  height: 35rem;

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

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const RightProfile = styled.button`
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
  background-image: url(${ProfileImg3});
  transition: transform 0.3s;
  /* background-color: red; */

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const TopProfile = styled.button`
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
  background-image: url(${ProfileImg4});
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const LeftProfile = styled.button`
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
  background-image: url(${ProfileImg2});
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

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
  display: block;
  justify-content: right;
  text-align: center;
  color: #ea9f27;
  font-weight: 750;
`;
