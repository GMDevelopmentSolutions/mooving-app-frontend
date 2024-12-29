import { OrderStatus } from "@/interface/interface";

const labelByStatus: { [key in OrderStatus]: string } = {
	[OrderStatus.Request]: "Request",
	[OrderStatus.Cancelled]: "Cancelled",
	[OrderStatus.Booked]: "Booked",
	[OrderStatus.InvoiceSent]: "Invoice Sent",
	[OrderStatus.InvoiceConfirmed]: "Invoice Confirmed",
	[OrderStatus.Confirmed]: "Confirmed",
	[OrderStatus.Closed]: "Closed",
	[OrderStatus.Unknown]: "Unknown",
};

export default labelByStatus;
