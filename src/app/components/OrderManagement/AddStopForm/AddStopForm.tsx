import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useCallback, type FC } from "react";
import Input from "../../input/input";
import { ButtonTypeEnum } from "@/interface/interface";
import Label from "../../Label/Label";
import Button from "../../Button/Button";
import styles from "./AddStopForm.module.scss";
import SpriteSVG from "../../SpriteSVG/SpriteSVG";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStop } from "@/app/redux/slice/locationSlice";

const url = "https://nominatim.openstreetmap.org";

interface AddStopFormProps {
	onClose: () => void;
}

interface Address {
	address: string;
	lat: string;
	lon: string;
}

interface IFormAddStop {
	address: string;
}

const validationSchema = Yup.object({
	address: Yup.string().required("The field is mandatory"),
});

const initValues = {
	address: "",
};

const AddStopForm: FC<AddStopFormProps> = ({ onClose }) => {
	const [addressList, setAddressList] = useState<Address[]>([]);
	const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
	const [debouncedValue, setDebouncedValue] = useState("");
	const dispatch = useDispatch();
	const handleAddressSearch = useCallback(async (address: string) => {
		if (!address) {
			setAddressList([]);
			return;
		}

		const { data } = await axios.get(
			`${url}/search?format=json&q=${address}&addressdetails=1`,
		);
		const cityList: Address[] = [];
		data.forEach(
			({
				lat,
				lon,
				address,
			}: {
				lat: string;
				lon: string;
				address: { [key: string]: string };
			}): void => {
				const city: string =
					address.city || address.town || address.village || address.neighbourhood;
				const street: string =
					address.road || address.pedestrian || address.neighbourhood;
				const houseNumber: string = address.house_number;

				const fullAddress = `${street ? street + ", " : ""}${houseNumber ? houseNumber + ", " : ""}${city || ""}`;
				cityList.push({ address: fullAddress, lat, lon });
			},
		);

		setAddressList(cityList);
	}, []);

	useEffect((): (() => void) => {
		const timer = setTimeout((): void => {
			handleAddressSearch(debouncedValue);
		}, 1000);

		return () => clearTimeout(timer);
	}, [debouncedValue, handleAddressSearch]);

	const handleAddressSelect = (
		selectedAddress: { address: string; lat: string; lon: string },
		setFieldValue: (field: string, value: string) => void,
	) => {
		const { lat, lon } = selectedAddress;
		setCoordinates({ lat: Number(lat), lng: Number(lon) });
		setFieldValue("address", selectedAddress.address);
		setAddressList([]);
	};

	const handleSubmit = (
		values: IFormAddStop,
		{ resetForm }: FormikHelpers<IFormAddStop>,
	): void => {
		if (!coordinates) return;
		dispatch(
			setStop({
				coordinates: {
					latitude: coordinates.lat,
					longitude: coordinates.lng,
				},
			}),
		);
		resetForm();
		onClose();
	};

	return (
		<>
			<Formik
				initialValues={initValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, handleChange, setFieldValue }) => (
					<Form className={styles.form}>
						<div className={styles.formWrapper}>
							<Label htmlFor="address">
								Write the stop address
								<Input
									id="address"
									type="text"
									name="address"
									placeholder="Enter address"
									value={values.address}
									onChange={e => {
										handleChange(e);
										setDebouncedValue(e.target.value);
									}}
									showError
								/>
								{addressList.length > 0 && (
									<ul className={styles.addressList}>
										{addressList.map((item, index) => (
											<li
												key={index}
												className={styles.addressItem}
												onClick={() => handleAddressSelect(item, setFieldValue)}
											>
												<SpriteSVG href="icon-location" />
												{item.address}
											</li>
										))}
									</ul>
								)}
							</Label>
						</div>

						<Button type={ButtonTypeEnum.submit} buttonClass="buttonGreen">
							Save
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AddStopForm;
