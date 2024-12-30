import { type FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageCardList.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useWindowWidth from "@/hook/useWindowWidth";
import { IInventorsItems } from "@/interface/interface";

interface ImageCardListProps {
	isComplete?: boolean;
	inventors: IInventorsItems[];
}

const ImageCardList: FC<ImageCardListProps> = ({ inventors }) => {
	const isMobile = useWindowWidth(490);

	return (
		<>
			{!isMobile && (
				<ul className={styles.list}>
					{inventors?.map(
						({
							photoPaths,
							id,
							name,
						}: {
							photoPaths: string[];
							id: string;
							name: string;
						}) => <ImageCard key={id} photoPath={photoPaths} name={name} />,
					)}
				</ul>
			)}
			{isMobile && (
				<div className={styles.spiderWrapper}>
					<Swiper
						className={`mySwiper ${styles.swiper}`}
						slidesPerView={2}
						spaceBetween={8}
					>
						{inventors?.map(
							({
								photoPaths,
								id,
								name,
							}: {
								photoPaths: string[];
								id: string;
								name: string;
							}) => (
								<SwiperSlide key={id} className={styles.swiperSlide}>
									<ImageCard photoPath={photoPaths} name={name} />
								</SwiperSlide>
							),
						)}
					</Swiper>
				</div>
			)}
		</>
	);
};
export default ImageCardList;
