"use client";
import { useEffect, useState, type FC } from "react";
import AdminTable from "./AdminTable/AdminTable";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Toolbar from "./Toolbar/Toolbar";
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import { useGetAllOrders } from "@/hook/useGetAllAdminOrders";
import { IOrderItem } from "@/interface/interface";

const AdminManagement: FC = ({}) => {
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [prevFilter, setPrevFilter] = useState("");
	const [margOrders, setMergedOrders] = useState<IOrderItem[] | []>([]);
	const { data, isFetching } = useGetAllOrders({ page, filter });

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		if (isFetching) return;
		if (prevFilter !== filter) {
			setMergedOrders(data.orders);
		}
		if (margOrders.length > 0 && page !== 1) {
			setMergedOrders(predState => [...predState, ...data.orders]);
			setPrevFilter(filter);
		} else {
			setMergedOrders(data.orders);
			setPrevFilter(filter);
		}
	}, [data, filter, isFetching]);

	return (
		<>
			<Container>
				<HeaderAdmin />
			</Container>
			<Container>
				<Toolbar setPage={setPage} setFilter={setFilter} />
				{margOrders && <AdminTable orders={margOrders} />}
				<Button
					disabled={
						data?.totalPages === page || isFetching || data?.totalItems === 0
					}
					onClick={handleLoadMore}
					buttonClass="loadMore"
				>
					Load more
				</Button>
			</Container>
		</>
	);
};
export default AdminManagement;
