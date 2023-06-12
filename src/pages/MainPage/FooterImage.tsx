import React from "react";
import styled from "styled-components";

interface StyledImageProps {
  rightSrc: string;
  rightAlt: string;
  leftSrc: string;
  leftAlt: string;
}

const FooterImage: React.FC<StyledImageProps> = ({
  leftSrc,
  leftAlt,
  rightSrc,
  rightAlt,
}) => {
  return (
    <>
      <RightImage src={rightSrc} alt={rightAlt} />
      <LeftImage src={leftSrc} alt={leftAlt} />
    </>
  );
};

export default FooterImage;

const RightImage = styled.img`
  height: 30%;
  position: fixed;
  bottom: 0;
  right: -50px;
`;
const LeftImage = styled.img`
  height: 30%;
  position: fixed;
  bottom: 0;
  left: -30px;
`;
