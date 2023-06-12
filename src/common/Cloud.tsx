import React from "react";
import styled from "styled-components";
import cloud1 from "../asset/img/leftCloud.png";
import cloud2 from "../asset/img/rightCloud.png";
import cloud3 from "../asset/img/cloud.png";

import cloud4 from "../asset/img/leftCloud2.png";
import cloud5 from "../asset/img/rightCloud2.png";
import cloud6 from "../asset/img/cloud2.png";
import "./styles.css";

function Cloud() {
	return (
		<>
			<img className="cloud1" src={cloud4} alt="구름들"></img>
			<img className="cloud2" src={cloud5} alt="구름들"></img>
			<img className="cloud3" src={cloud6} alt="구름"></img>
		</>
	);
}

export default Cloud;
