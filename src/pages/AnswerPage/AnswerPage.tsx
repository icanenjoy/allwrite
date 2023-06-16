import React, { useEffect } from "react";
import AnswerRender from "./AnswerRender";
import styled from "styled-components";
import FooterImage from "../MainPage/FooterImage";

const AnswerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AnswerRender />
    </>
  );
};

export default AnswerPage;
