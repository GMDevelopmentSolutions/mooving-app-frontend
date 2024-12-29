"use client";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./AdminFormLogin.module.scss";
import Input from "../input/input";
import { ButtonTypeEnum } from "@/interface/interface";
import Label from "../Label/Label";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hook/useLoginMutation";
import { useEffect } from "react";

interface IFormLogin {
	email: string;
	password: string;
}

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
const AdminFormLogin = () => {
	const router = useRouter();

	const { mutate: login, isError, isSuccess } = useLoginMutation();

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
			router.push("/admin");
		}
	}, [isSuccess, isError, router]);

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
						<Field
							type="checkbox"
							name="policy"
							id="policy"
							className={styles.checkbox}
						/>

						<Button type={ButtonTypeEnum.submit} buttonClass="buttonGreen">
							Log in
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AdminFormLogin;
