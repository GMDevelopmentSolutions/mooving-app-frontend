import { type FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageCardList.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useWindowWidth from "@/hook/useWindowWidth";
const ImageCardList: FC = ({}) => {
	const isMobile = useWindowWidth(490);

	return (
		<>
			{!isMobile && (
				<ul className={styles.list}>
					<li>
						<ImageCard />
					</li>
					<li>
						<ImageCard />
					</li>
				</ul>
			)}
			{isMobile && (
				<div className={styles.spiderWrapper}>
					<Swiper
						className={`mySwiper ${styles.swiper}`}
						slidesPerView={2}
						spaceBetween={8}
					>
						<SwiperSlide className={styles.swiperSlide}>
							<ImageCard />
						</SwiperSlide>
						<SwiperSlide className={styles.swiperSlide}>
							<ImageCard />
						</SwiperSlide>
						<SwiperSlide className={styles.swiperSlide}>
							<ImageCard />
						</SwiperSlide>
						<SwiperSlide className={styles.swiperSlide}>
							<ImageCard />
						</SwiperSlide>
					</Swiper>
				</div>
			)}
		</>
	);
};
export default ImageCardList;
