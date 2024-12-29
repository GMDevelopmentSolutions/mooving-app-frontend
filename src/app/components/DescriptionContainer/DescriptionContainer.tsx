"use client";
import { type FC, type ChangeEvent } from "react";
import styles from "./DescriptionContainer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectRoute } from "@/app/redux/selectLocation";
import { setDescription } from "@/app/redux/slice/locationSlice";

interface DescriptionContainerProps {
	disabled: boolean;
}

const DescriptionContainer: FC<DescriptionContainerProps> = ({ disabled }) => {
	const dispatch = useDispatch();
	const { description: text } = useSelector(selectRoute);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setDescription(event.target.value));
	};

	return (
		<div className={styles.descriptionContainer}>
			<textarea
				placeholder="Text"
				value={text}
				maxLength={100}
				onChange={handleChange}
				disabled={disabled}
			/>
			<p className={styles.textLength}>{text?.length}/100</p>
		</div>
	);
};
export default DescriptionContainer;
