import { Form, Formik, FormikHelpers } from "formik";
import { useState, type FC } from "react";
import Label from "../../Label/Label";
import Input from "../../input/input";
import styles from "./FeedbackForm.module.scss";
import InputMask from "react-input-mask";
import * as Yup from "yup";
import clsx from "clsx";
import Button from "../../Button/Button";
import { ButtonTypeEnum } from "@/interface/interface";
import TimeInput from "./TimeInput/TimeInput";

const validationSchema = Yup.object({
	phone: Yup.string().min(14).max(14).required("The field is mandatory"),
	hover: Yup.string().required("The field is mandatory"),
	minutes: Yup.string().required("The field is mandatory"),
	format: Yup.boolean(),
});

const initialValues = {
	phone: "",
	hover: "",
	minutes: "",
	format: false,
};

const FeedbackForm: FC = ({}) => {
	const [showCall, setShowCall] = useState(true);

	const handleSubmit = (
		values: typeof initialValues,
		{ resetForm }: FormikHelpers<typeof initialValues>,
	) => {
		resetForm();
	};

	return (
		<div className={styles.feedbackForm}>
			<p>Choose a convenient time to contact</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ handleBlur, setFieldValue, values }) => {
					const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
						const { name, value } = event.target;

						const applyLimits = (value: number, min: number, max: number) => {
							return Math.max(min, Math.min(max, value)).toString();
						};

						if (name === "hover")
							setFieldValue(name, applyLimits(Number(value), 0, 12));
						else if (name === "minutes")
							setFieldValue(name, applyLimits(Number(value), 0, 59));
						else setFieldValue(name, value);
					};

					return (
						<Form className={styles.form}>
							<button
								className={clsx(styles.callBtn, { [styles.active]: showCall })}
								onClick={() => {
									setShowCall(true);
								}}
							>
								<span></span>
								Call back now
							</button>
							{showCall && (
								<Label htmlFor="name">
									Phone number
									<InputMask
										mask="(999) 999-9999"
										value={values.phone}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										{/* @ts-expect-error  cant type of InputMask */}
										{inputProps => (
											<Input
												{...inputProps}
												type="text"
												name="phone"
												placeholder="(999) 999-9999"
												title="Phone"
											/>
										)}
									</InputMask>
								</Label>
							)}
							<button
								className={clsx(styles.callBtn, { [styles.active]: !showCall })}
								onClick={() => {
									setShowCall(false);
								}}
							>
								<span></span>I will choose the time to call
							</button>
							{!showCall && (
								<>
									<Label htmlFor="phone">
										Phone number
										<InputMask
											mask="(999) 999-9999"
											value={values.phone}
											onChange={handleChange}
											handleBlur={handleBlur}
										>
											{/* @ts-expect-error  cant type of InputMask */}
											{inputProps => (
												<Input
													{...inputProps}
													name="phone"
													placeholder="(999) 999-9999"
													title="Phone"
												/>
											)}
										</InputMask>
									</Label>
									<TimeInput
										hover={values.hover}
										minutes={values.minutes}
										handleChange={handleChange}
									/>
								</>
							)}
							<Button
								type={ButtonTypeEnum.submit}
								buttonClass="buttonBlue"
								style={{ width: "auto" }}
							>
								Confirm
							</Button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};
export default FeedbackForm;
