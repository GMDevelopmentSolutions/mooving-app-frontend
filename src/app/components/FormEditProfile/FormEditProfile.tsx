"use client";
import styles from "./FormEditProfile.module.scss";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Input from "../input/input";
import { ButtonTypeEnum, IFormEditProfile } from "@/interface/interface";
import Label from "../Label/Label";
import Button from "../Button/Button";

const validationSchema = Yup.object({
	name: Yup.string().required("The field is mandatory"),
	phone: Yup.string().required("The field is mandatory"),
	email: Yup.string()
		.email("Invalid email address")
		.required("The field is mandatory"),
	newPassword: Yup.string()
		.required("The field is mandatory")
		.min(8, "Password must be at least 8 characters long"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "Passwords must match")
		.required("The field is mandatory"),
});
const initialValues: IFormEditProfile = {
	name: "",
	phone: "",
	email: "",
	newPassword: "",
	confirmPassword: "",
};
const FormEditProfile = () => {
	const handleSubmit = (
		values: IFormEditProfile,
		{ resetForm }: FormikHelpers<IFormEditProfile>,
	): void => {
		resetForm();
	};
	return (
		<>
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
							<Label htmlFor="phone">
								Phone
								<Input type="text" name="phone" placeholder="Enter your phone" />
							</Label>
							<Label htmlFor="email">
								Name
								<Input type="text" name="email" placeholder="Enter your email" />
							</Label>
							<Label htmlFor="new-password">
								New Password
								<Input
									type="password"
									name="newPassword"
									placeholder="Enter your password"
									hideToggle={true}
								/>
							</Label>
							<Label htmlFor="name">
								Confirm Password
								<Input
									type="password"
									name="confirmPassword"
									placeholder="Enter your password"
									hideToggle={true}
								/>
							</Label>
							<Button type={ButtonTypeEnum.submit} buttonClass="buttonGreen">
								Label
							</Button>
						</Form>
					)}
				</Formik>
			</>
		</>
	);
};

export default FormEditProfile;
