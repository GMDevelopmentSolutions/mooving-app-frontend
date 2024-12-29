import { useState, useEffect } from "react";

const useWindowWidth = (threshold: number) => {
	const [isBelowThreshold, setIsBelowThreshold] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsBelowThreshold(window.innerWidth <= threshold);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [threshold]);

	return isBelowThreshold;
};

export default useWindowWidth;
