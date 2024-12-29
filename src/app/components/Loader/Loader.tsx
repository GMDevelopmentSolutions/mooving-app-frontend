"use client";

import styled from "./Loader.module.scss";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className={styled.overlay}>
			<BallTriangle
				height={100}
				width={100}
				radius={5}
				color="#4fa94d"
				ariaLabel="ball-triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default Loader;
