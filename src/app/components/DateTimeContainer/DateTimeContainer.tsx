import styles from "./DateTimeContainer.module.scss";
import TimeInput from "../OrderManagement/TimeInput/TimeInput";
import { DateAndTime, TimeUnit } from "@/interface/interface";
import React, { useEffect, useState, type FC } from "react";

import InputMask from "react-input-mask";

interface DateTimeContainerProps {
	dispatch: (value: string) => void;
	expectedDate: string;
	disabled: boolean;
}

const months: { [key: number]: number } = {
	1: 31,
	2: 28,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31,
};

const DateTimeContainer: FC<DateTimeContainerProps> = ({
	dispatch,
	expectedDate,
	disabled,
}) => {
	console.log("disabled", disabled);

	const dataAndTimeNaw = new Date();
	const hours = dataAndTimeNaw.getHours();
	const minutes = dataAndTimeNaw.getMinutes();
	const day = dataAndTimeNaw.getDate();
	const month = dataAndTimeNaw.getMonth() + 1;
	const year = dataAndTimeNaw.getFullYear();

	const [currentYear] = useState(new Date().getFullYear());
	const [initialValues, setInitialValues] = useState<DateAndTime>({
		[TimeUnit.APPOINTMENT_DATE]: `${day}/${month}/${year}`,
		[TimeUnit.HOURS]: hours.toString(),
		[TimeUnit.MINUTES]: minutes.toString(),
	});

	useEffect(() => {
		if (expectedDate?.length === 0) return;
		const stateDataTime = (expectedDate: string) => {
			const date = new Date(expectedDate);

			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			const hours = date.getHours();
			const minutes = date.getMinutes();
			setInitialValues({
				appointmentDate: `${day}/${month}/${year}`,
				hours: hours.toString(),
				minutes: minutes.toString(),
			} as DateAndTime);
		};
		stateDataTime(expectedDate);
	}, [expectedDate]);

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const day = event.target.value.split("/")[0];
		const month = event.target.value.split("/")[1];
		const year = event.target.value.split("/")[2];
		const daysInMonth = months[parseInt(month, 10)];
		const yearOnFocus = year.split("").some(char => char === "_");
		const newDate = {
			day,
			month,
			year,
		};
		if (parseInt(day, 10) > daysInMonth) newDate.day = daysInMonth.toString();
		if (parseInt(month, 10) > 12) newDate.month = "12";

		if (
			(!yearOnFocus && parseInt(year, 10) < currentYear) ||
			parseInt(year, 10) > currentYear + 2
		) {
			newDate.year = new Date().getFullYear().toString();
		} else {
			newDate.year = year;
		}

		const newDateString = `${newDate.day}/${newDate.month}/${newDate.year}`;
		setInitialValues(prev => ({
			...prev,
			[TimeUnit.APPOINTMENT_DATE]: newDateString,
		}));
	};

	useEffect(() => {
		if (
			initialValues.appointmentDate &&
			initialValues.hours &&
			initialValues.minutes
		) {
			const [day, month, year] = initialValues.appointmentDate
				.split("/")
				.map(Number);
			const hours = parseInt(initialValues.hours, 10);
			const minutes = parseInt(initialValues.minutes, 10);

			const timeoutId = setTimeout(() => {
				const isoDate = new Date(
					year,
					month - 1,
					day,
					hours,
					minutes,
				).toISOString();
				dispatch(isoDate);
			}, 5000);

			return () => clearTimeout(timeoutId);
		}
	}, [dispatch, initialValues]);

	const today = new Date().toISOString().split("T")[0];

	return (
		<div className={styles.formContainer}>
			<label htmlFor={`${TimeUnit.APPOINTMENT_DATE}`} className={styles.label}>
				Date
				<InputMask
					mask="99/99/9999"
					id={TimeUnit.APPOINTMENT_DATE}
					name={TimeUnit.APPOINTMENT_DATE}
					placeholder="Enter your date"
					value={initialValues[TimeUnit.APPOINTMENT_DATE]}
					onChange={event =>
						handleDateChange(event as React.ChangeEvent<HTMLInputElement>)
					}
					className={styles.input}
					min={today}
					disabled={disabled}
				/>
			</label>
			<TimeInput
				minutes={initialValues[TimeUnit.MINUTES]}
				hover={initialValues[TimeUnit.HOURS]}
				handleChange={(field, value) => {
					setInitialValues(prev => ({ ...prev, [field]: value }));
				}}
				disabled={disabled}
			/>
		</div>
	);
};

export default DateTimeContainer;
