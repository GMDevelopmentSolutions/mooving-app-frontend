"use client";
import { Formik, Form,  ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import styles from "./formSingIn.module.scss";
import Input from "../input/input";
import Label from "../Label/Label";
import { ButtonTypeEnum, IFormSingIn } from "@/interface/interface";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useSingInMutation } from "@/hook/useSingInMutation";
import { useLoginMutation } from "@/hook/useLoginMutation";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("The field is mandatory"),
	policy: Yup.boolean().oneOf([true], "The field is mandatory"),
	password: Yup.string()
		.required("The field is mandatory")
		.min(6, "Password must be at least 8 characters long")
		.matches(/[a-z]/, "Password must have at least one lowercase letter")
		.matches(/[A-Z]/, "Password must have at least one uppercase letter")
		.matches(
			/[^a-zA-Z0-9]/,
			"Password must have at least one non-alphanumeric character",
		),
});
const initialValues: IFormSingIn = {
	name: "",
	email: "",
	policy: false,
	password: "",
};

const FormSingIn = () => {
	const router = useRouter();
	const [value, setValue] = useState(initialValues);
	const { mutate: singIn, isError, isSuccess, isPending } = useSingInMutation();
	const {
		mutate: login,
		isError: isErrorLogin,
		isSuccess: isSuccessLogin,
		isPending: isPendingLogin,
	} = useLoginMutation();

	const handleSubmit = (
		values: IFormSingIn,
		// { resetForm }: FormikHelpers<IFormSingIn>,
	) => {
		const { email, password } = values;
		singIn({ email, password });

		// if (isSuccess && !isError) {
		// 	resetForm();
		// }
	};

	useEffect(() => {
		if (isSuccess && !isError) {
			const { email, password } = value;
			login({ email, password });
		}
	}, [isSuccess, isError, value, login]);

	useEffect(() => {
		if (isSuccessLogin && !isErrorLogin) {
			router.push("/order");
		}
	}, [isErrorLogin, isSuccessLogin, router]);

	return (
		<>
			<Formik
				initialValues={value}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, setFieldValue }) => (
					<Form className={styles.form}>
						<Label htmlFor="name">
							Name
							<Input
								type="text"
								name="name"
								placeholder="Enter your name"
								value={value.name}
								onChange={e => {
									setFieldValue("name", e.target.value);
									setValue({ ...value, name: e.target.value });
								}}
							/>
						</Label>
						<Label htmlFor="email">
							Email
							<Input
								type="text"
								name="email"
								placeholder="Enter your email"
								value={value.email}
								onChange={e => {
									setFieldValue("email", e.target.value);
									setValue({ ...value, email: e.target.value });
								}}
							/>
						</Label>
						<Label htmlFor="password">
							Password
							<Input
								type="password"
								name="password"
								placeholder="Enter your password"
								hideToggle={true}
								value={value.password}
								onChange={e => {
									setFieldValue("password", e.target.value);
									setValue({ ...value, password: e.target.value });
								}}
							/>
						</Label>
						<Field
							type="checkbox"
							name="policy"
							id="policy"
							className={styles.checkbox}
							value={values.policy}
							checked={values.policy}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setFieldValue("policy", e.target.checked);
								setValue({ ...value, policy: e.target.checked });
							}}
						/>
						<label htmlFor="policy" className={styles.policy}>
							By creating an account, I agree to our Terms of use and Privacy Policy
							<ErrorMessage name="policy" component="div" />
						</label>

						<Button
							disabled={isPending || isPendingLogin || (isSuccess && isSuccessLogin)}
							type={ButtonTypeEnum.submit}
							buttonClass="buttonGreen"
						>
							Log in
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default FormSingIn;
