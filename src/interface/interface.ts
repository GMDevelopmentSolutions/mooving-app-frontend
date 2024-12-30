import { Option } from "@/app/components/InventorManagement/Select/Select";
import { Dispatch, SetStateAction } from "react";

export interface IFormLogin {
	email: string;
	password: string;
}

export interface IFormSingIn extends IFormLogin {
	name: string;
	policy: boolean;
}

export interface IWrapperProps {
	children: React.ReactNode;
	background?: string;
	paddingTop?: string;
	maxWidth?: string;
}

export enum ButtonTypeEnum {
	button = "button",
	submit = "submit",
	reset = "reset",
}

export enum OrderStatus {
	Request = 0,
	Booked = 5,
	InvoiceSent = 10,
	InvoiceConfirmed = 20,
	Confirmed = 50,
	Closed = 100,
	Cancelled = 400,
	Unknown = 1000,
}

export enum TimeUnit {
	HOURS = "hours",
	MINUTES = "minutes",
	APPOINTMENT_DATE = "appointmentDate",
	FORMAT_TIME = "formatTime",
}

export interface DateAndTime {
	[TimeUnit.APPOINTMENT_DATE]: string;
	[TimeUnit.HOURS]: string;
	[TimeUnit.MINUTES]: string;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface Location {
	startLocation: Coordinates;
	finalDestination: Coordinates;
}

export type SetToken = Dispatch<SetStateAction<string | null>>;

export interface IAdminTableBody {
	clientName: string;
	id: string;
	phoneNumber: string;
	requestType: string;
	startPoint: string;
	destination: string;
	description: string;
	createdAt: string;
	orderStatus: number;
	attachInvoice: string;
	createPdfInvoice: string;
}

export interface IInventorCreateItem {
	name: string;
	description: string;
	length: number;
	width: number;
	height: number;
	weight: number;
	pictures: File[];
}

export interface IInventorChangeItem extends IInventorCreateItem {
	itemId: number;
}
export interface IRouteData {
	start: {
		lat: number;
		lng: number;
	};
	end: {
		lat: number;
		lng: number;
	};
	stop: {
		lat: number;
		lng: number;
	}[];
}

export interface IOrderUser {
	id: number;
	briefDescription: string;
	orderStatus: OrderStatus;
	expectedDate: string;
}

export interface IInventorsItems {
	description: string;
	height: number;
	id: string;
	length: number;
	name: string;
	photoPaths: string[];
	roomId: string;
	userId: string;
	weight: number;
	width: number;
	quantity: number;
}

export interface Room {
	id: string;
	photoPath: string;
	name: string;
}
export interface IOrderItem {
	id?: string;
	orderStatus?: OrderStatus;
	startLocation: {
		latitude: number;
		longitude: number;
	};
	stopLocations: {
		id: number;
		latitude: number;
		longitude: number;
	}[];
	finalDestination: {
		latitude: number;
		longitude: number;
	};
	inventoryItemIds: string[];
	expectedDate: string;
	labourRequiredType: number;
	description: string;
}

export interface InventorListProps {
	isError: boolean;
	error: Error | null;
	rooms?: { id: string; name: string; photoPath: string }[];
	onclick: {
		setIdToInvemtorCreate: React.Dispatch<React.SetStateAction<string>>;
		handleShowModal: () => void;
		handleShowModalRoomCreate: () => void;
	};
}

interface OnClickProps {
	handleShowModal: () => void;
	setIdToInvemtorCreate: React.Dispatch<React.SetStateAction<string>>;
	handleShowModalRoomCreate: () => void;
}

export interface InventorItemProps {
	id?: string | undefined;
	src: string;
	text: string;
	onClick?: OnClickProps;
}

export interface FormaInventorProps {
	onSubmit?: (values: IFormaInventor) => void;
	onClose?: () => void;
	rooms: Option[] | undefined;
	roomId?: string;
	idToInvemtorCreate: string;
}

export interface IFormaInventor {
	name: string;
	description: string;
	length: number | string;
	height: number | string;
	width: number | string;
	weight: number | string;
	room: number | string;
	photo?: File;
	quantity: number | string;
}

export interface CounterItemProps {
	props: IInventorsItems;
}

export interface ChangeInfoParams {
	name: string;
	phone: string;
	email: string;
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}
