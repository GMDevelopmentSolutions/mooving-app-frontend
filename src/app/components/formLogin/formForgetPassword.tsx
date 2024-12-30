"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./formLogin.module.scss";
import Input from "../input/input";
import { ButtonTypeEnum } from "@/interface/interface";
import Label from "../Label/Label";
import Button from "../Button/Button";

import { type FC, useEffect } from "react";
import { useForgotPasswordMutation } from "@/hook/useForgotPasswordMutation";

interface FormForgetPasswordProps {
	onClose: () => void;
}
interface IForm {
	email: string;
}
const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("The field is mandatory"),
});
const initialValues: IForm = {
	email: "",
};
const FormForgetPassword: FC<FormForgetPasswordProps> = ({ onClose }) => {
	const { mutate: forgotPassword, isSuccess: isSuccessForgotPassword } =
		useForgotPasswordMutation();
	const handleSubmit = (values: IForm) => {
		const { email } = values;
		forgotPassword({ email });
		console.log("email", email);
		onClose();
	};

	useEffect(() => {
		if (isSuccessForgotPassword) onClose();
	}, [isSuccessForgotPassword, onClose]);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({}) => (
					<Form className={styles.form}>
						<Label htmlFor="email">
							Email
							<Input type="text" name="email" placeholder="Enter your email" />
						</Label>

						<Button type={ButtonTypeEnum.submit} buttonClass="buttonGreen">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default FormForgetPassword;
