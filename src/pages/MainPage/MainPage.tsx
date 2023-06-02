import React, { useState } from "react";
import styled from "styled-components";
import TodayAnswer from "./TodayAnswer";
import rabbit1 from "./rabbit1.png";
import rabbit2 from "./rabbit2.png";
import rabbit3 from "./rabbit3.png";
import rabbit4 from "./rabbit4.png";
import BestAnswer1 from "./BestAnswer1";
import BestAnswer2 from "./BestAnswer2";
import BestAnswer3 from "./BestAnswer3";
import BestAnswer4 from "./BestAnswer4";

function Main() {
  const [count, setCount] = useState(0);

  function add_count() {
    if (count === 5) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <Background>
      <Container1>
        <Profile></Profile>
        <Profile2></Profile2>
        <Profile3></Profile3>
        <Profile4></Profile4>

        <Name>토롱이</Name>
        <Level>LV14</Level>
        <Container
          onClick={() => {
            add_count();
          }}
        >
          <Progress></Progress>
        </Container>
        <Question>오늘의 질문</Question>
        <TodayAnswer />
      </Container1>
      <Container2></Container2>
      <Container3>
        <BestQuestion>가장 답변이 많은 질문</BestQuestion>
        <BestAnswerContainer>
          <BestAnswer1 />
          <BestAnswer2 />
        </BestAnswerContainer>
        <BestAnswerContainer2>
          <BestAnswer3 />
          <BestAnswer4 />
        </BestAnswerContainer2>
      </Container3>
    </Background>
  );
}

export default Main;
const Background = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #dbeff4;
`;

const Container1 = styled.div`
  width: 100%;
  height: 34rem;
  margin-top: 2rem;
  text-align: center;
  background-color: #dbeff4;
`;

const Profile = styled.button`
  height: 17rem;
  width: 16rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  margin-top: 2rem;
  background-color: #dbeff4;
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
  margin-left: 10rem;
  position: absolute;
  background-color: #dbeff4;
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
  margin-top: 1rem;
  margin-left: 15rem;
  position: absolute;
  background-color: #dbeff4;
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
  margin-top: 5rem;
  margin-left: -38rem;
  position: absolute;
  background-color: #dbeff4;
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
  color: #73a1ec;
  font-weight: 750;
`;

const Level = styled.div`
  font-size: 1.2rem;
  height: 1rem;
  width: 100%;
  overflow: visible;
  position: absoulte;
  margin-top: 1rem;
  color: #73a1ec;
  font-weight: 750;
`;

const Container = styled.div`
  margin: 10px auto;
  background-color: #e8e3e3;
  width: 500px;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const Progress = styled.div`
  background-color: #a7e2f9;
  width: 80%;
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

//프로그레스 바에 원 달아서 프로그레스 바가 차오를 때 같이 차오름

const Container2 = styled.div`
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;

const Question = styled.div`
  font-size: 1.2rem;
  height: 2rem;
  width: 100%;
  overflow: visible;
  position: absoulte;
  margin-top: 4rem;
  color: #73a1ec;
  font-weight: 750;
`;

const Container3 = styled.div`
  width: 100%;
  height: 27rem;
  display: block;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;

const BestQuestion = styled.div`
  font-size: 1.2rem;
  height: 2rem;
  width: 100%;
  overflow: visible;
  position: absoulte;
  margin-top: 6rem;
  color: #73a1ec;
  font-weight: 750;
`;

const BestAnswerContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;
const BestAnswerContainer2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #73a1ec;
  font-weight: 750;
`;
