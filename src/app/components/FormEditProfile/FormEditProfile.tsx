"use client";
import styles from "./FormEditProfile.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../input/input";
import { ButtonTypeEnum, ChangeInfoParams } from "@/interface/interface";
import Label from "../Label/Label";
import Button from "../Button/Button";
import { useChangeInfo } from "@/hook/useChangeInfo";
import { useGetUsersMe } from "@/hook/useGetUsersMe";
import InputMask from "react-input-mask";

const validationSchema = Yup.object({
	name: Yup.string().required("The field is mandatory"),
	phone: Yup.string().required("The field is mandatory"),
	email: Yup.string().email("Invalid email address"),
	currentPassword: Yup.string().required("The field is mandatory"),
	newPassword: Yup.string()
		.required("The field is mandatory")
		.min(6, "Password must be at least 8 characters long"),
	confirmNewPassword: Yup.string()
		.oneOf([Yup.ref("newPassword")], "Passwords must match")
		.required("The field is mandatory"),
});

const FormEditProfile = () => {
	const { data: user, isLoading } = useGetUsersMe();

	const { mutate: changeInfo } = useChangeInfo();

	const handleSubmit = (values: ChangeInfoParams): void => {
		changeInfo(values);
	};

	if (isLoading) return <div>Loading...</div>;

	const initialValues: ChangeInfoParams = {
		name: user?.userName || "",
		phone: user?.phoneNumber || "",
		email: user?.email || "",
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ handleBlur, setFieldValue, values }) => {
					const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
						const { name, value } = event.target;
						setFieldValue(name, value);
					};

					return (
						<Form className={styles.form}>
							<Label htmlFor="name">
								Name
								<Input type="text" name="name" placeholder="Enter your name" />
							</Label>
							<Label htmlFor="phone">
								Phone number
								<InputMask
									mask="(999) 999-9999"
									value={values.phone}
									onChange={handleChange}
									onBlur={handleBlur}
									name="phone"
								>
									{/* @ts-expect-error  cant type of InputMask */}
									{inputProps => (
										<Input
											{...inputProps}
											type="text"
											placeholder="(999) 999-9999"
											title="Phone"
										/>
									)}
								</InputMask>
							</Label>

							<Label htmlFor="email">
								Email
								<Input type="text" name="email" placeholder="Enter your email" />
							</Label>
							<Label htmlFor="currentPassword">
								Current Password
								<Input
									type="password"
									name="currentPassword"
									placeholder="Enter your password"
									hideToggle={true}
								/>
							</Label>
							<Label htmlFor="newPassword">
								New Password
								<Input
									type="password"
									name="newPassword"
									placeholder="Enter your password"
									hideToggle={true}
								/>
							</Label>
							<Label htmlFor="confirmNewPassword">
								Confirm Password
								<Input
									type="password"
									name="confirmNewPassword"
									placeholder="Enter your password"
									hideToggle={true}
								/>
							</Label>
							<Button type={ButtonTypeEnum.submit} buttonClass="buttonGreen">
								Label
							</Button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default FormEditProfile;
