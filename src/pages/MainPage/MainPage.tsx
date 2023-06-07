import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodayAnswer from "./TodayAnswer";
import Calendar from "./Calendar";
import rabbit1 from "./img/rabbit1.png";
import rabbit2 from "./img/rabbit2.png";
import rabbit3 from "./img/rabbit3.png";
import rabbit4 from "./img/rabbit4.png";
import BestAnswer from "./BestAnswer";
import HeaderBar from "../../common/HeaderBar";
import { Background } from "../../common/Background";

function Main() {
  const [count, setCount] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(rabbit1);

  function add_count() {
    if (count === 5) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  function changeProfile2() {
    setSelectedProfile(rabbit2); // Set the selectedProfile to rabbit2
  }
  function changeProfile3() {
    setSelectedProfile(rabbit3); // Set the selectedProfile to rabbit2
  }
  function changeProfile4() {
    setSelectedProfile(rabbit4); // Set the selectedProfile to rabbit2
  }
  useEffect(() => {
    // Update the container width to its full width after a delay
    const timeout = setTimeout(() => {
      setContainerWidth(70);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    // <Background>
    <>
      <Container1>
        <Profile
          style={{ backgroundImage: `url(${selectedProfile})` }}
        ></Profile>
        <Profile2 onClick={changeProfile2}></Profile2>
        <Profile3 onClick={changeProfile3}></Profile3>
        <Profile4 onClick={changeProfile4}></Profile4>

        <Name>토롱이</Name>
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
        <BestAnswerContainer>
          <BestAnswer msg="kkkk" />
          <BestAnswer msg="bbbb" />
          <BestAnswer msg="ssss" />
        </BestAnswerContainer>
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
  height: 17rem;
  width: 16rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  margin-top: 2rem;
  background-color: #ffe256;
  background-repeat: no-repeat;
  background-image: url(${rabbit1});
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const Profile3 = styled.button`
  height: 10rem;
  width: 9rem;
  background-size: 100% 100%;
  border: none;
  border-radius: 1rem;
  margin-top: 15rem;
  margin-left: 9rem;
  position: absolute;
  background-color: #ffe256;
  background-repeat: no-repeat;
  background-image: url(${rabbit3});
  transition: transform 0.3s;
  /* background-color: red; */

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const Profile4 = styled.button`
  height: 10rem;
  width: 9rem;
  background-size: 100% 100%;
  border: none;
  border-radius: 1rem;
  margin-top: 3rem;
  margin-left: 6rem;
  position: absolute;
  background-color: #ffe256;
  background-repeat: no-repeat;
  background-image: url(${rabbit4});
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
`;

const Profile2 = styled.button`
  height: 10rem;
  width: 10rem;
  background-size: 100% 100%;
  border: none;
  border-radius: 1rem;
  margin-top: 11rem;
  margin-left: -35rem;
  position: absolute;
  background-color: #ffe256;
  background-repeat: no-repeat;
  background-image: url(${rabbit2});
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
