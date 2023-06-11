import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profileImg from "../../asset/img/profileImg.png";
import Calendar from "../MainPage/Calendar";

const StyledCalendar = styled(Calendar)`
  color: black; // 원하는 색상으로 변경해주세요.
`;
function Mypage() {
  return (
    <>
      <Container>
        <LeftContainer>
          <Profiles>
            <EditBtn>수정</EditBtn>
            <Profile />
            <Name>GUEST</Name>
            <Level>LV 18</Level>
          </Profiles>
        </LeftContainer>
        <StyledCalendar />
      </Container>
    </>
  );
}

export default Mypage;

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

const Profile = styled.div`
  width: 10rem;
  height: 10rem;
  margin-left: 7.5rem;
  margin-top: 1rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${profileImg});
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
