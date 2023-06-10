import React from "react";
import styled from "styled-components";
import cloud1 from "../asset/img/leftCloud.png";
import cloud2 from "../asset/img/rightCloud.png";
import cloud3 from "../asset/img/cloud.png";
import "./styles.css";

function Cloud() {
	return (
		<>
			<img className="cloud1" src={cloud1} alt="구름들"></img>
			<img className="cloud2" src={cloud2} alt="구름들"></img>
			<img className="cloud3" src={cloud3} alt="구름"></img>
		</>
	);
}

export default Cloud;
