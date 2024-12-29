"use client";
import {
	ChangeEvent,
	FC,
	MouseEvent,
	ReactNode,
	useEffect,
	useId,
	useState,
} from "react";
import styles from "./AddPhotoInput.module.scss";
import Image from "next/image";
import SpriteSVG from "../SpriteSVG/SpriteSVG";

interface AddPhotoInputProps {
	children: ReactNode;
	setValue: (file?: File) => void;
	initHref?: string;
	setTouched?: () => void;
	className?: string;
	previewClassName?: string;
}

const AddPhotoInput: FC<AddPhotoInputProps> = ({
	children,
	className,
	setValue,
	initHref,
	setTouched,
	previewClassName,
}) => {
	const id = useId();
	const [imagePath, setImagePath] = useState("");

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files?.[0] || null;

		if (!file) return;

		if (setTouched) setTouched();
		setValue(file);

		const reader = new FileReader();
		reader.addEventListener("load", e => {
			if (!e?.target?.result) return;
			if (!e.target.result.toString().includes("data:image")) return;
			setImagePath(e.target.result.toString());
		});
		reader.readAsDataURL(file);
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		setValue();
		setImagePath("");
	};

	useEffect(() => {
		if (initHref) setImagePath(initHref);
	}, [initHref]);

	return (
		<div>
			<label htmlFor={id} className={className}>
				{!imagePath && children}
				{imagePath && (
					<div className={styles.previewWrapper}>
						<Image
							className={previewClassName}
							src={imagePath}
							width={256}
							height={256}
							alt="Uploaded image"
						/>
						<button type="button" className={styles.button} onClick={handleClick}>
							<SpriteSVG
								href="icon-delete"
								width={28}
								height={28}
								className={styles.iconDelete}
							/>
						</button>
					</div>
				)}
			</label>

			<input
				type="file"
				name="file"
				id={id}
				className={styles.hideInput}
				onChange={handleChangeFile}
			/>
		</div>
	);
};

export default AddPhotoInput;
