"use client";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { type FC } from "react";
import Input from "../../input/input";
import { ButtonTypeEnum } from "@/interface/interface";
import Label from "../../Label/Label";
import Button from "../../Button/Button";
import styles from "./AddInventoryForm.module.scss";
import AddPhotoInput from "../../AddPhotoInput/AddPhotoInput";
import SpriteSVG from "../../SpriteSVG/SpriteSVG";
import getFileExtension from "@/utils/getFileExtension";

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 4 * 1024 * 1024;

interface IFormaInventor {
	name: string;
	description: string;
	length: number | string;
	height: number | string;
	width: number | string;
	weight: number | string;
	photo: File | null;
}

enum SuportedFilesExtensions {
	"png",
	"jpg",
	"jpeg",
}

const validationSchema = Yup.object({
	name: Yup.string().required("The field is mandatory"),
	description: Yup.string().min(0).max(30).required("The field is mandatory"),
	length: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	height: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	width: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	weight: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	photo: Yup.mixed<File>()
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
const initialValues: IFormaInventor = {
	name: "",
	description: "",
	length: "",
	height: "",
	width: "",
	weight: "",

	photo: null,
};

interface AddInventoryFormProps {
	onClose?: () => void;
	onSubmit?: (values: IFormaInventor) => void;
}

const AddInventoryForm: FC<AddInventoryFormProps> = ({ onClose, onSubmit }) => {
	const handleSubmit = (
		values: IFormaInventor,
		{ resetForm }: FormikHelpers<IFormaInventor>,
	) => {
		resetForm();
		if (onClose) onClose();
		if (onSubmit) onSubmit(values);
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, setFieldTouched, errors, touched }) => (
					<Form className={styles.form}>
						<Label htmlFor="name">
							Inventory name
							<Input type="text" name="name" placeholder="Enter inventory name" />
						</Label>
						<Label htmlFor="email">
							Description
							<Input type="textarea" name="description" placeholder="Text" />
						</Label>
						<div className={styles.row}>
							<div className={styles.column}>
								<Label htmlFor="length">
									Length (ft)
									<Input type="number" name="length" placeholder="Enter length" />
								</Label>
								<Label htmlFor="height">
									Height (ft)
									<Input type="number" name="height" placeholder="Enter height" />
								</Label>
							</div>
							<div className={styles.column}>
								<Label htmlFor="width">
									Width (ft)
									<Input type="number" name="width" placeholder="Enter width" />
								</Label>
								<Label htmlFor="weight">
									Weight (ft)
									<Input type="number" name="weight" placeholder="Enter weight" />
								</Label>
							</div>
						</div>

						<div className={styles.photoInputWrapper}>
							<AddPhotoInput
								className={styles.photoInput}
								setValue={value => setFieldValue("photo", value)}
								setTouched={() => setFieldTouched("photo", true)}
							>
								<SpriteSVG href="icon-add-photo" width={24} height={24} />
								<p className={styles.textPhoto}>Upload photos of inventory</p>
							</AddPhotoInput>

							{errors.photo && touched.photo ? (
								<p className={styles.error}>{errors.photo}</p>
							) : null}
						</div>

						<Button type={ButtonTypeEnum.submit} buttonClass="buttonBlue">
							Add inventory
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
export default AddInventoryForm;
