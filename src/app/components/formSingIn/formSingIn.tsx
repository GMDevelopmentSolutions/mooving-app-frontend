"use client";
import { Formik, Form, FormikHelpers, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import styles from "./formSingIn.module.scss";
import Input from "../input/input";
import Label from "../Label/Label";
import { ButtonTypeEnum, IFormSingIn } from "@/interface/interface";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSingInMutation } from "@/hook/useSingInMutation";

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
	const { mutate: singIn, isError, isSuccess, isPending } = useSingInMutation();

	const handleSubmit = (
		values: IFormSingIn,
		{ resetForm }: FormikHelpers<IFormSingIn>,
	) => {
		const { email, password } = values;
		singIn({ email, password });

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
						<Label htmlFor="name">
							Name
							<Input type="text" name="name" placeholder="Enter your name" />
						</Label>
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
						<label htmlFor="policy" className={styles.policy}>
							By creating an account, I agree to our Terms of use and Privacy Policy
							<ErrorMessage name="policy" component="div" />
						</label>

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

export default FormSingIn;
