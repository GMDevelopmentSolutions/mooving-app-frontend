"use client";
import { type FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./WaiverForm.module.scss";
import { ButtonTypeEnum } from "@/interface/interface";
import Button from "../../Button/Button";
import Checkbox from "./Checkbox/Checkbox";
import Input from "../../input/input";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface IWaiverFormProps {
	orderId: string;
	cancelOrderById: UseMutateFunction<
		void,
		AxiosError,
		{ orderId: string },
		unknown
	>;
	isPending: boolean;
	onClose: () => void;
}

interface IForm {
	checkbox: string[];
	description: string;
}

const validationSchema = Yup.object({
	checkbox: Yup.array().min(1, "Please select at least one option"),
	description: Yup.string(),
});

const initialValues: IForm = {
	checkbox: [],
	description: "",
};

const checkData = [
	{
		id: "1",
		name: "policy",
		label: "The More Important the Work, the More Important the Rest",
		checked: false,
	},
	{
		id: "2",
		name: "policy",
		label: "In the eighteenth century the German",
		checked: false,
	},
	{
		id: "3",
		name: "policy",
		label:
			"In the eighteenth century the German philosopher Immanuel Kant developed a theory of knowledge in",
		checked: false,
	},
	{
		id: "4",
		name: "policy",
		label: "Physiological respiration involves the mechanisms",
		checked: false,
	},
];

const WaiverForm: FC<IWaiverFormProps> = ({
	orderId,
	cancelOrderById,
	isPending,
	onClose,
}) => {
	const handleSubmit = (values: IForm, { resetForm }: FormikHelpers<IForm>) => {
		cancelOrderById({ orderId });
		resetForm();
		onClose();
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({}) => (
					<Form className={styles.form}>
						<div className={styles.wrapCheckbox}>
							{checkData.map(({ id, name, label }) => (
								<Checkbox key={id} name={name} id={id} label={label} />
							))}
						</div>
						<label className={styles.label}>
							Or specify your own option
							<Input type="textarea" name="description" placeholder="Text" />
						</label>

						<Button
							disabled={isPending}
							type={ButtonTypeEnum.submit}
							buttonClass="buttonGreen"
						>
							Confirm
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
export default WaiverForm;
