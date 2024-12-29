"use client";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./formLogin.module.scss";
import Input from "../input/input";
import { ButtonTypeEnum, IFormLogin } from "@/interface/interface";
import Label from "../Label/Label";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hook/useLoginMutation";
import { useEffect } from "react";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("The field is mandatory"),

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
const initialValues: IFormLogin = {
	email: "",

	password: "",
};
const FormLogin = () => {
	const router = useRouter();
	const { mutate: login, isError, isSuccess, isPending } = useLoginMutation();

	const handleSubmit = (
		values: IFormLogin,
		{ resetForm }: FormikHelpers<IFormLogin>,
	) => {
		const { email, password } = values;
		login({
			email,
			password,
		});

		if (isSuccess && !isError) {
			resetForm();
		}
	};

	useEffect(() => {
		if (isSuccess && !isError) {
			router.push("/order");
		}
	}, [isError, router, isSuccess]);

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

						<Label htmlFor="password">
							Password
							<Input
								type="password"
								name="password"
								placeholder="Enter your password"
								hideToggle={true}
							/>
						</Label>
						<button type="button" className={styles.buttonForget}>
							Forget your password
						</button>
						<Button
							disabled={isPending}
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

export default FormLogin;
