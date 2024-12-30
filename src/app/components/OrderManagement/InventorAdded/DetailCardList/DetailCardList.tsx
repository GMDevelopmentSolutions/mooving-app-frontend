import type { FC } from "react";
import DetailCard from "../DetailCard/DetailCard";
import useWindowWidth from "@/hook/useWindowWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DetailCardList.module.scss";
import { IInventorsItems } from "@/interface/interface";

interface IDetailCardListProps {
	inventors: IInventorsItems[];
}

const DetailCardList: FC<IDetailCardListProps> = ({ inventors }) => {
	const isMobile = useWindowWidth(491);
	return (
		<>
			<ul className={styles.list}>
				{!isMobile &&
					inventors.map((inventor: IInventorsItems) => (
						<li key={inventor.id} className={styles.item}>
							<DetailCard inventor={inventor} />
						</li>
					))}
			</ul>
			{isMobile && (
				<div className={styles.spiderWrapper}>
					<Swiper
						className={`mySwiper ${styles.swiper}`}
						slidesPerView={1}
						spaceBetween={8}
					>
						{inventors.map((inventor: IInventorsItems) => (
							<SwiperSlide key={inventor.id} className={styles.swiperSlide}>
								<DetailCard inventor={inventor} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
		</>
	);
};
export default DetailCardList;
