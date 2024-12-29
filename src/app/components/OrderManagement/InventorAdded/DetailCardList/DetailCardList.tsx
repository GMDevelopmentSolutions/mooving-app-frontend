import type { FC } from "react";
import DetailCard from "../DetailCard/DetailCard";
import useWindowWidth from "@/hook/useWindowWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./DetailCardList.module.scss";

const DetailCardList: FC = ({}) => {
	const isMobile = useWindowWidth(491);
	return (
		<>
			{!isMobile && <DetailCard />}
			{isMobile && (
				<div className={styles.spiderWrapper}>
					<Swiper
						className={`mySwiper ${styles.swiper}`}
						slidesPerView={1}
						spaceBetween={8}
					>
						<SwiperSlide className={styles.swiperSlide}>
							<DetailCard />
						</SwiperSlide>
						<SwiperSlide className={styles.swiperSlide}>
							<DetailCard />
						</SwiperSlide>
						<SwiperSlide className={styles.swiperSlide}>
							<DetailCard />
						</SwiperSlide>
						<SwiperSlide className={styles.swiperSlide}>
							<DetailCard />
						</SwiperSlide>
					</Swiper>
				</div>
			)}
		</>
	);
};
export default DetailCardList;
