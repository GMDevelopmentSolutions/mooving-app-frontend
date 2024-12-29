"use client";
import { useCallback, useEffect, useState, type FC } from "react";
import styles from "./CounterItem.module.scss";
import SpriteSVG from "../../SpriteSVG/SpriteSVG";
import AddPhotoInput from "../../AddPhotoInput/AddPhotoInput";
import Modal from "../../Modal/modal";
import Button from "../../Button/Button";
import { useQueryClient } from "@tanstack/react-query";
import { CounterItemProps, Room } from "@/interface/interface";
import { inventorService } from "@/services/inventorService";
import { Confirm } from "notiflix";
import useDebaunce from "@/hook/useDebaunce";
import { useInventorMutation } from "@/hook/useInventorMutate";

const CounterItem: FC<CounterItemProps> = ({
	props: {
		description,
		height,
		id,
		length,
		name,
		weight,
		width,
		photoPaths,
		quantity,
	},
}) => {
	const data = useQueryClient();
	const rooms = data.getQueryData<Room[]>(["inventorGetRooms"]);
	const [count, setCount] = useState(rooms?.length ? quantity : 0);
	const [modalAttach, setModalAttach] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
		rooms?.length ? rooms[0].id : null,
	);

	const { mutate: changeInventor, isPending } = useInventorMutation({
		mutationFn: (params: { id: string; roomId: string }) =>
			inventorService.changeItemRoom(params.id, params.roomId),
		onSuccessMessage: "Item successfully attached to room!",
		onErrorMessage: "Failed to attach item to room.",
		invalidateQueriesKey: "inventorGetInventors",
	});

	const { mutate: mutateChange } = useInventorMutation({
		mutationFn: ({ formData, id }: { formData: FormData; id: string }) =>
			inventorService.changeItem(formData, id),
		onSuccessMessage: "Inventor updated successfully!",
		onErrorMessage: "Failed to update inventor.",
		invalidateQueriesKey: "inventorGetInventors",
	});
	const { mutate: mutateDelete } = useInventorMutation({
		mutationFn: (id: string) => inventorService.deleteItem(id),
		onSuccessMessage: "The inventory has been deleted",
		onErrorMessage: "Failed to delete inventor.",
		invalidateQueriesKey: "inventorGetInventors",
	});

	const callMutate = useCallback(
		(count: number | string) => {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("description", description);
			formData.append("height", height.toString());
			formData.append("length", length.toString());
			formData.append("quantity", count.toString());
			formData.append("weight", weight.toString());
			formData.append("width", width.toString());
			if (uploadedFile) {
				formData.append("pictures[]", uploadedFile);
			}

			mutateChange({ formData, id });
		},
		[
			description,
			height,
			length,
			name,
			weight,
			width,
			uploadedFile,
			mutateChange,
			id,
		],
	);

	const debouncedMutate = useDebaunce(callMutate, 500);

	useEffect(() => {
		if (uploadedFile) {
			callMutate(count);
		}
	}, [uploadedFile, count, callMutate]);

	const handleIncrement = () => {
		setCount(count => count + 1);
		debouncedMutate(count);
	};

	const handleDecrement = () => {
		if (count === 0) return;
		setCount(count => count - 1);
		debouncedMutate(count);
	};

	const handleAttach = () => {
		if (selectedRoomId) {
			changeInventor({ id, roomId: selectedRoomId });
		}
	};

	const handleDelete = () => {
		Confirm.show(
			"Inventor delete action",
			`Are you sure you want to remove the ${name}?`,
			"Yes",
			"No",
			() => {
				mutateDelete(id);
			},
			() => null,
			{
				backgroundColor: "#163561",
				titleColor: "white",
				messageColor: "white",
				titleFontSize: "24px",
				cancelButtonBackground: "red",
				okButtonColor: "black",
				cancelButtonColor: "black",
			},
		);
	};

	return (
		<>
			<div className={styles.counterItem}>
				<div className={styles.titleContainer}>
					<span className={styles.title}>{name} </span>
					<div className={styles.attach}>
						<button type="button" onClick={() => setModalAttach(true)}>
							<SpriteSVG href="icon-attach" width={15} height={20} color="#5865da" />
						</button>
					</div>
					<div className={styles.attach}>
						<button
							type="button"
							className={styles.deleteButton}
							onClick={handleDelete}
						>
							<SpriteSVG
								href="icon-delete"
								width={20}
								height={30}
								className={styles.iconDelete}
							/>
						</button>
					</div>
				</div>
				<div className={styles.counterContainer}>
					<AddPhotoInput
						setValue={file => setUploadedFile(file || null)}
						initHref={process.env.NEXT_PUBLIC_API_URL + "/uploads/" + photoPaths}
						previewClassName={styles.preview}
						className={styles.photoInput}
					>
						<SpriteSVG
							href="icon-add_photo_alternate"
							width={32}
							height={32}
							color="#5865da"
						/>
					</AddPhotoInput>

					<div className={styles.counterWrap}>
						<button className={styles.button} onClick={handleDecrement}>
							<SpriteSVG href="icon-minus" width={10} height={10} color="#fff" />
						</button>
						<span className={styles.counter}>{count}</span>
						<button className={styles.button} onClick={handleIncrement}>
							<SpriteSVG href="icon-plus" width={12} height={12} color="#fff" />
						</button>
					</div>
				</div>
			</div>
			{modalAttach && (
				<Modal handleClose={() => setModalAttach(false)} title="Attach to room">
					<label className={styles.label}>
						Room name
						<select
							onChange={e => setSelectedRoomId(e.target.value)}
							value={selectedRoomId || ""}
							className={styles.select}
						>
							{rooms?.length === 0 && (
								<option value="empty">There are no rooms created.</option>
							)}
							{rooms?.map(el => {
								return (
									<option key={el.id} id={el.id} value={el.id}>
										{el.name}
									</option>
								);
							})}
						</select>
						<SpriteSVG
							className={styles.arrow}
							href="icon-arrow"
							width={12}
							height={8}
						/>
					</label>
					<Button
						className={styles.attachButton}
						onClick={handleAttach}
						buttonClass="buttonBlue"
						disabled={isPending || !selectedRoomId}
					>
						Attach
					</Button>
				</Modal>
			)}
		</>
	);
};
export default CounterItem;
