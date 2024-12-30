import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./FormAddRoom.module.scss";
import { FC } from "react";
import AddPhotoInput from "../AddPhotoInput/AddPhotoInput";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import Button from "../Button/Button";
import { inventorService } from "@/services/inventorService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Notify } from "notiflix";
import { validationSchema } from "@/services/inventorAddRoomSchema";

const validation = validationSchema;

export interface OnClickHandlers {
	handleShowModal?: () => void;
	handleShowModalRoomCreate?: () => void;
}

export type InventorListProps = {
	onClick?: OnClickHandlers;
	onClose?: () => void;
};

const FormAddRoom: FC<InventorListProps> = ({ onClose }) => {
	const initValues = { name: "", photo: undefined };
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: inventorService.createRoom,
		onSuccess: () => {
			if (onClose) onClose();
			Notify.success("Room created successfully!", {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
			queryClient.invalidateQueries({ queryKey: ["inventorGetRooms"] });
			Notiflix.Loading.remove();
		},
		onMutate: () => {
			Notiflix.Loading.arrows({ svgColor: "#628ecb" });
		},
		onError: error => {
			Notiflix.Loading.remove();
			Notify.failure(error.message, {
				position: "right-top",
				clickToClose: true,
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
		},
	});

	const handleSubmit = (values: { name: string; photo: File | undefined }) => {
		const picture = values.photo as File;
		mutate({
			name: values.name,
			picture: picture,
		});
	};

	return (
		<Formik
			initialValues={initValues}
			onSubmit={handleSubmit}
			validationSchema={validation}
		>
			{({ setFieldValue, setFieldTouched, errors, touched, isValid }) => (
				<Form className={styles.form}>
					<label className={styles.label}>
						Room name
						<Field
							className={styles.field}
							type="text"
							name="name"
							placeholder="Write a name for the room"
						/>
						<ErrorMessage component="p" name="name" className={styles.error} />
					</label>

					{/* <label className={styles.label}>
						Room size
						<Field
							className={styles.field}
							type="text"
							name="size"
							placeholder="Write a room size"
						/>
						<ErrorMessage component="p" name="size" className={styles.error} />
					</label> */}

					<div className={styles.photoInputWrapper}>
						<AddPhotoInput
							className={styles.photoInput}
							setValue={value => setFieldValue("photo", value)}
							setTouched={() => setFieldTouched("photo", true)}
						>
							<SpriteSVG href="icon-add-photo" width={24} height={24} />
							<p>Add a room photo</p>
						</AddPhotoInput>

						{errors.photo && touched.photo ? (
							<p className={styles.error}>{errors.photo}</p>
						) : null}
					</div>

					<Button
						buttonClass="buttonBlue"
						disabled={!isValid || Object.keys(touched).length === 0 || isPending}
						type="submit"
					>
						{isPending ? "Loading..." : "Confirm"}
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default FormAddRoom;
