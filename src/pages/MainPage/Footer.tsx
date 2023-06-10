import React from "react";
import styled from "styled-components";

interface StyledProps {
	src: string;
	alt: string;
}

const Footer: React.FC<StyledProps> = ({ src, alt }) => {
	return (
		<>
			<Image src={src} alt={alt} />
		</>
	);
};

export default Footer;

const Image = styled.img`
	height: 100%;
	position: flex;
`;
