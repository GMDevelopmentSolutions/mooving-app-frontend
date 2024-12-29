import type { FC } from "react";
import DividerWithTitle from "../../DividerWithTitle/DividerWithTitle";
import CounterItem from "../CounterItem/CounterItem";
import styles from "./CounterList.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useWindowWidth from "@/hook/useWindowWidth";
import { IInventorsItems } from "@/interface/interface";

interface CounterListProps {
	title?: string;
	inventorsItems: undefined | IInventorsItems[];
	roomsId?: string | undefined;
}

const CounterList: FC<CounterListProps> = ({
	title,
	inventorsItems,
	roomsId = null,
}) => {
	const inventorsArr = inventorsItems
		?.sort((a, b) => a.id.localeCompare(b.id))
		.filter(el => el.roomId === roomsId);
	const isMobile = useWindowWidth(490);

	return (
		<>
			<DividerWithTitle title={title} />

			{!isMobile && (
				<div className={styles.wrapCounterItem}>
					{inventorsArr?.length === 0 && <p>No inventory...</p>}
					{inventorsArr?.map(item => <CounterItem props={item} key={item.id} />)}
				</div>
			)}
			{isMobile && (
				<Swiper
					className={`${styles.swiper} mySwiper`}
					slidesPerView={"auto"}
					spaceBetween={8}
					breakpoints={{
						490: {
							spaceBetween: 20,
						},
					}}
				>
					{inventorsArr?.length === 0 && <p>No inventory...</p>}
					{inventorsArr?.map(item => (
						<SwiperSlide key={item.id} style={{ width: "auto" }}>
							<CounterItem props={item} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
};
export default CounterList;
