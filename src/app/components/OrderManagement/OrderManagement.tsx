"use client";
import { useEffect, useState, type FC } from "react";
import Header from "../Header/Header";
import Wrap from "../Wrap/Wrap";
import Container from "../Container/Container";
import AddStop from "../AddStop/AddStop";
import SizeTeemContainer from "../SizeTeemContainer/SizeTeemContainer";
import DateTimeContainer from "../DateTimeContainer/DateTimeContainer";
import DescriptionContainer from "../DescriptionContainer/DescriptionContainer";
import BookingInfo from "../BookingInfo/BookingInfo";
import H5 from "../H5/H5";
import InventorAdded from "./InventorAdded/InventorAdded";
import Modal from "../Modal/modal";
import AddStopForm from "./AddStopForm/AddStopForm";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import styles from "./OrderManagement.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectRoute } from "../../redux/selectLocation";
import {
	resetRoute,
	setEndLocation,
	setInventors,
	setSizeTeem,
	setStartLocation,
	setTimeAndDate,
	updateStop,
} from "@/app/redux/slice/locationSlice";
import Map from "./Map/Map";
import DeliveryPoint from "../DeliveryPoint/DeliveryPoint";
import { useSubmitRouteMutation } from "@/hook/useSubmitRouteMutation";
import { useGetOrderById } from "@/hook/useGetOrderById";
import { IInventorsItems, IOrderItem } from "@/interface/interface";
import { useGetInventorData } from "@/hook/useGetInventorData";
import { inventorService } from "@/services/inventorService";
import { useGetInventoryItemsByOrderId } from "@/hook/useGetInventoryItemsByOrderId";

interface OrderManagementProps {
	orderId?: string;
}

enum LocationType {
	START = "start",
	END = "end",
}

const OrderManagement: FC<OrderManagementProps> = ({ orderId }) => {
	const [showAddStopForm, setShowAddStopForm] = useState(false);
	const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
	const [showFeedbackForm, setShowFeedbackForm] = useState(false);
	const dispatch = useDispatch();

	const getInventoryItems = useGetInventorData("inventorGetInventors", () =>
		inventorService.getItems(),
	);

	const getInventoryItemsByOrderId = useGetInventoryItemsByOrderId({
		orderId: orderId ?? "",
	});

	const { data: inventors, isPending: inventorsIsPending } = orderId
		? getInventoryItemsByOrderId
		: getInventoryItems;

	const [isClient, setIsClient] = useState(false);

	const initialState = useSelector(selectRoute);

	const { mutate: submitRoute, isSuccess: submitRouteIsSuccess } =
		useSubmitRouteMutation();

	const { data: order } = useGetOrderById({ orderId: orderId ?? "" });

	const location: IOrderItem = orderId ? order : initialState;

	const handleShowAddStopForm = () => {
		setShowAddStopForm(!showAddStopForm);
	};

	const handleAdditionalInfo = () => {
		setShowAdditionalInfo(!showAdditionalInfo);
	};
	const handleShowFeedbackForm = () => {
		setShowFeedbackForm(!showFeedbackForm);
	};

	const updateLocation = (type: LocationType, coordinates: [number, number]) => {
		if (!coordinates) return;
		const location = {
			latitude: coordinates[1],
			longitude: coordinates[0],
		};
		if (type === LocationType.START) {
			dispatch(setStartLocation(location));
		} else if (type === LocationType.END) {
			dispatch(setEndLocation(location));
		}
	};

	const updateStopLocation = (coordinates: [number, number], id: number) => {
		if (!coordinates) return;

		const location = {
			latitude: coordinates[1],
			longitude: coordinates[0],
		};
		dispatch(updateStop({ id, coordinates: location }));
	};

	const updateTimeAndDate = (timeAndDate: string) => {
		dispatch(setTimeAndDate(timeAndDate));
	};

	const updateSizeTeem = (sizeTeem: number) => {
		dispatch(setSizeTeem(sizeTeem));
	};

	useEffect(() => {
		if (orderId) return;

		const inventorsItems = inventors?.map(
			(item: IInventorsItems) => item.id,
		) as string[];

		dispatch(setInventors(inventorsItems));
	}, [dispatch, inventors, orderId]);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleSendOrder = () => {
		submitRoute(location);
	};

	const handleCancelBooking = () => {
		dispatch(resetRoute());
	};

	useEffect(() => {
		if (submitRouteIsSuccess) dispatch(resetRoute());
	}, [submitRouteIsSuccess, dispatch]);

	return (
		<>
			{showAddStopForm && (
				<Modal title="Add a stop" handleClose={handleShowAddStopForm}>
					<AddStopForm onClose={handleShowAddStopForm} />
				</Modal>
			)}
			{showAdditionalInfo && (
				<Modal title="Additional information" handleClose={handleAdditionalInfo}>
					<AdditionalInfo onClose={handleAdditionalInfo} />
				</Modal>
			)}
			{showFeedbackForm && (
				<Modal
					title="Shedule a call with account manager"
					handleClose={() => handleShowFeedbackForm()}
				>
					<FeedbackForm onClose={handleShowFeedbackForm} />
				</Modal>
			)}
			<Header>{orderId ? "Label :" + orderId : "Order"}</Header>
			{isClient && (
				<Wrap>
					<Container>
						<Map
							coordinates={{
								startLocation: location?.startLocation,
								finalDestination: location?.finalDestination,
							}}
							extraMarkers={location?.stopLocations}
						/>

						<DeliveryPoint
							isCompleted={Boolean(orderId)}
							coordinates={
								location?.startLocation && [
									location.startLocation.longitude,
									location.startLocation.latitude,
								]
							}
							onChangeLocation={coordinates =>
								updateLocation(LocationType.START, coordinates)
							}
							title="Start point"
							fill="#531BAF"
						/>
						<DeliveryPoint
							isCompleted={Boolean(orderId)}
							coordinates={
								location?.finalDestination && [
									location.finalDestination.longitude,
									location.finalDestination.latitude,
								]
							}
							onChangeLocation={coordinates =>
								updateLocation(LocationType.END, coordinates)
							}
							title="Destination"
							fill="#7BB02C"
						/>
						{location?.stopLocations?.length > 0 &&
							location.stopLocations.map(({ id, latitude, longitude }) => (
								<DeliveryPoint
									isCompleted={Boolean(orderId)}
									key={id}
									id={id}
									coordinates={[longitude, latitude]}
									onChangeLocation={coordinates => updateStopLocation(coordinates, id)}
									title="Stop"
									fill="#ff0000"
								/>
							))}
					</Container>
					{!orderId && <AddStop onClick={handleShowAddStopForm} />}
					<Container className={styles.container}>
						<H5> What size team do you need?</H5>
						<SizeTeemContainer
							disabled={Boolean(orderId)}
							dispatch={updateSizeTeem}
							labourRequiredType={location?.labourRequiredType}
						/>
					</Container>
					<Container>
						<H5> Enter date & time</H5>
						<DateTimeContainer
							disabled={Boolean(orderId)}
							expectedDate={location?.expectedDate}
							dispatch={updateTimeAndDate}
						/>
					</Container>
					<Container>
						<H5> Enter description</H5>
						<DescriptionContainer disabled={Boolean(orderId)} />
					</Container>
					<Container>
						{inventors && (
							<InventorAdded inventors={inventors} isComplete={Boolean(orderId)} />
						)}
					</Container>
					<Container>
						<BookingInfo
							onCancelBooking={handleCancelBooking}
							isComplete={Boolean(orderId)}
							inventorsIsPending={inventorsIsPending}
							sendOrder={handleSendOrder}
							onFeedbackFormOpen={handleShowFeedbackForm}
							items={inventors}
						/>
					</Container>
				</Wrap>
			)}
		</>
	);
};
export default OrderManagement;
