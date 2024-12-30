"use client";
import { type FC, type ChangeEvent, useState } from "react";
import styles from "./DescriptionContainer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectRoute } from "@/app/redux/selectLocation";
import { setDescription } from "@/app/redux/slice/locationSlice";
import useDebaunce from "@/hook/useDebaunce";

interface DescriptionContainerProps {
	disabled: boolean;
}

const DescriptionContainer: FC<DescriptionContainerProps> = ({ disabled }) => {
	const dispatch = useDispatch();
	const { description: initialText } = useSelector(selectRoute);

	const [text, setText] = useState(initialText);

	const debouncedMutate = useDebaunce((value: string) => {
		dispatch(setDescription(value));
	}, 500);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		setText(value);
		debouncedMutate(value);
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
