"use client";

import { useState, type FC } from "react";
import styles from "./SizeTeemContainer.module.scss";
import SizeTeemCart from "../SizeTeemCart/SizeTeemCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const data = [
	{
		label: "Labour only (2 movers with equipment)",
		id: 0,
		name: "size",
		value: 0,
		text: "Total costs for 3 hrs be 347$",
	},
	{
		label: "Labour only (2 movers with equipment)",
		id: 1,
		name: "size",
		value: 1,
		text: "Total costs for 3 hrs be 347$",
	},
	{
		label: "Labour only (2 movers with equipment)",
		id: 2,
		name: "size",
		value: 2,
		text: "Total costs for 3 hrs be 347$",
	},
];

interface SizeTeemContainerProps {
	dispatch: (value: number) => void;
	labourRequiredType: number;
	disabled: boolean;
}

const SizeTeemContainer: FC<SizeTeemContainerProps> = ({
	dispatch,
	labourRequiredType,
	disabled,
}) => {
	const [selectedSize, setSelectedSize] = useState<number>(
		labourRequiredType || 0,
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(Number(event.target.value));
		setSelectedSize(Number(event.target.value));
	};

	return (
		<div className={styles.teemContainer}>
			<Swiper
				className={`${styles.swiper} mySwiper`}
				slidesPerView={"auto"}
				spaceBetween={8}
				breakpoints={{
					490: {
						spaceBetween: 20,
					},
				}}
			>
				{data.map(item => (
					<SwiperSlide key={item.id} style={{ width: "auto" }}>
						<SizeTeemCart
							label={item.label}
							id={item.id}
							name={item.name}
							value={item.value}
							text={item.text}
							onChange={handleChange}
							checked={selectedSize === item.value}
							disabled={disabled}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
export default SizeTeemContainer;
