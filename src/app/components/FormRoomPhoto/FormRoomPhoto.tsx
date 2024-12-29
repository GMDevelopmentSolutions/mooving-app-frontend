import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import AddPhotoInput from "../AddPhotoInput/AddPhotoInput";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import styles from "./FormRoomPhoto.module.scss";
import Button from "../Button/Button";
import { mixed, object, string } from "yup";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function getFileExtension(filename: string) {
	if (!filename) return "";
	const parts = filename.split(".");
	return parts[parts.length - 1];
}

enum SuportedFilesExtensions {
	"png",
	"jpg",
	"jpeg",
}

const validationSchema = object({
	name: string().required("The field is mandatory"),
	size: string().required("The field is mandatory"),
	photo: mixed<File>()
		.test({
			message: `Please provide a supported file type ${Object.values(
				SuportedFilesExtensions,
			)
				.filter(value => typeof value === "string")
				.join(", ")}`,
			test: (file, context) => {
				if (!file) return true;
				if (!file.name) return true;
				const isValid = Object.values(SuportedFilesExtensions).includes(
					getFileExtension(file.name),
				);
				if (!isValid) context?.createError();
				return isValid;
			},
		})
		.test({
			message: `File too big, can't exceed ${MAX_FILE_SIZE / 1024 / 1024} MB`,
			test: file => {
				if (!file) return true;
				const isValid = file?.size < MAX_FILE_SIZE;
				return isValid;
			},
		}),
});

const FormRoomPhoto: FC = () => {
	const initValues = { name: "", photo: undefined };
	return (
		<Formik
			initialValues={initValues}
			onSubmit={() => {}}
			validationSchema={validationSchema}
		>
			{({ setFieldValue, setFieldTouched, errors, touched, isValid }) => (
				<>
					<p className={styles.desc}>
						Just take a picture of the room and we&apos;ll figure it out.
					</p>
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
							disabled={!isValid || Object.keys(touched).length === 0}
							type="submit"
						>
							Confirm
						</Button>
					</Form>
				</>
			)}
		</Formik>
	);
};
export default FormRoomPhoto;
