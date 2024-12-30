import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import Input from "../../input/input";
import {
	ButtonTypeEnum,
	FormaInventorProps,
	IFormaInventor,
	IInventorsItems,
} from "../../../../interface/interface";
import Label from "../../Label/Label";
import Button from "../../Button/Button";
import styles from "./FormaInventor.module.scss";
import Select from "../Select/Select";
import { mixed } from "yup";
import AddPhotoInput from "../../AddPhotoInput/AddPhotoInput";
import SpriteSVG from "../../SpriteSVG/SpriteSVG";
import Notiflix, { Notify } from "notiflix";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inventorService } from "@/services/inventorService";
import { useInventorMutation } from "@/hook/useInventorMutate";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function getFileExtension(filename: string): string {
	const parts = filename.split(".");
	return parts[parts.length - 1].toLowerCase();
}

enum SuportedFilesExtensions {
	png = "png",
	jpg = "jpg",
	jpeg = "jpeg",
}

const validationSchemaCreateInventor = Yup.object({
	name: Yup.string().required("The field is mandatory"),
	description: Yup.string().min(0).max(30).required("The field is mandatory"),
	length: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	height: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	quantity: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	width: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	weight: Yup.number()
		.min(1, "Value must be greater than zero")
		.required("The field is mandatory"),
	photo: mixed<File>()
		.test(
			"fileSize",
			`File too big, can't exceed ${MAX_FILE_SIZE / 1024 / 1024} MB`,
			value => !value || value.size <= MAX_FILE_SIZE,
		)
		.test("fileType", `Unsupported file type`, value => {
			if (!value) return true;
			const fileExtension = getFileExtension(value.name);
			return Object.values(SuportedFilesExtensions).includes(
				fileExtension as SuportedFilesExtensions,
			);
		}),
});

const initialValues: IFormaInventor = {
	name: "",
	description: "",
	length: "",
	height: "",
	width: "",
	weight: "",
	room: "",
	quantity: "",
};

const FormaInventor: FC<FormaInventorProps> = ({
	idToInvemtorCreate,
	rooms,
	onSubmit,
	onClose,
}) => {
	const [inventorName, setInventorName] = useState("");
	const queryClient = useQueryClient();
	const { mutate: changeInventor } = useInventorMutation({
		mutationFn: (params: { id: string | undefined; roomId: string }) =>
			inventorService.changeItemRoom(params?.id, params.roomId),
		onSuccessMessage: "Item successfully attached to room!",
		onErrorMessage: "Failed to attach item to room.",
		invalidateQueriesKey: "inventorGetInventors",
	});
	const { mutate, isError, error } = useMutation({
		mutationFn: inventorService.createItem,
		onMutate: () => {
			Notiflix.Loading.arrows();
		},
		onSuccess: async () => {
			if (onClose) onClose();

			if (!idToInvemtorCreate) {
				queryClient.invalidateQueries({ queryKey: ["inventorGetInventors"] });
				Notify.success("Inventor created successfully!", {
					position: "right-top",
					clickToClose: true,
					timeout: 5000,
					cssAnimationStyle: "zoom",
				});
				Notiflix.Loading.remove();
			} else {
				await queryClient.refetchQueries({ queryKey: ["inventorGetInventors"] });
				const updatedInventors = queryClient.getQueryData<IInventorsItems[]>([
					"inventorGetInventors",
				]);
				const filteredInventor = updatedInventors?.find(
					inventor => inventor.name === inventorName,
				);
				const filteredInventorId = filteredInventor?.id;
				changeInventor({ id: filteredInventorId, roomId: idToInvemtorCreate });
				Notiflix.Loading.remove();
			}

			setInventorName("");
		},
		onError: () => {
			Notiflix.Loading.remove();
			Notify.failure("An error occurred while creating the inventor.", {
				position: "right-top",
				timeout: 5000,
				cssAnimationStyle: "zoom",
			});
		},
	});

	const handleSubmit = (
		values: IFormaInventor,
		{ resetForm }: FormikHelpers<IFormaInventor>,
	) => {
		resetForm();
		const formData = new FormData();
		formData.append("name", values.name);
		setInventorName(values.name);
		formData.append("description", values.description);
		formData.append("length", values.length.toString());
		formData.append("height", values.height.toString());
		formData.append("quantity", values.quantity.toString());
		formData.append("width", values.width.toString());
		formData.append("weight", values.weight.toString());

		if (values.photo) {
			formData.append("photo", values.photo);
		}
		mutate(formData);
		if (onSubmit) onSubmit(values);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchemaCreateInventor}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue }) => (
				<Form className={styles.form}>
					<Label htmlFor="name">
						Name
						<Input type="text" name="name" placeholder="Enter your name" />
					</Label>
					<label className={styles.label}>
						<Select options={rooms} onSelect={name => setFieldValue("room", name)} />
					</label>
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
						<Label htmlFor="quantity">
							Quantity
							<Input type="number" name="quantity" placeholder="Enter quantity" />
						</Label>
					</div>

					<div className={styles.photoInputWrapper}>
						<AddPhotoInput
							className={styles.photoInput}
							setValue={value => setFieldValue("photo", value)}
							setTouched={() => {}}
						>
							<SpriteSVG href="icon-add-photo" width={24} height={24} />
							<p>Add a photo</p>
						</AddPhotoInput>
					</div>

					<Label htmlFor="description">
						Description
						<Input type="textarea" name="description" placeholder="Text" />
					</Label>

					<Button type={ButtonTypeEnum.submit} buttonClass="buttonGreen">
						Save changes
					</Button>

					{isError && <p className={styles.error}>{(error as Error).message}</p>}
				</Form>
			)}
		</Formik>
	);
};

export default FormaInventor;
