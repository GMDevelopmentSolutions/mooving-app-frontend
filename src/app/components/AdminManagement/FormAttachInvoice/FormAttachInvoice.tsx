import { useState, type FC } from "react";

import styles from "./FormAttachInvoice.module.scss";
import Button from "../../Button/Button";
import { useAttachInvoiceMutation } from "@/hook/useAttachInvoiceMutation";

interface FormAttachInvoiceProps {
	onClose?: () => void;
	id: string;
}

const FormAttachInvoice: FC<FormAttachInvoiceProps> = ({ onClose, id }) => {
	const [fileName, setFileName] = useState<File | null>(null);
	const { mutateAsync } = useAttachInvoiceMutation();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];
			if (selectedFile.size > 5 * 1024 * 1024) {
				alert("File size exceeds the limit of 5MB.");
				return;
			}
			setFileName(selectedFile);
		}
	};

	const handleSubmit = () => {
		if (fileName) {
			mutateAsync({
				file: fileName,
				id,
			});
			onClose?.();
		} else {
			alert("Please select a file before submitting.");
		}
	};

	return (
		<form className={styles.formAttachInvoice}>
			<label className={styles.label}>
				<span className={styles.uploadSpan}>
					{fileName ? fileName.name : "Upload Invoice"}
				</span>
				<input
					id="fileInput"
					type="file"
					className={styles.fileInput}
					onChange={handleFileChange}
				/>
			</label>
			<Button
				className={styles.attachButton}
				buttonClass="buttonBlue"
				onClick={handleSubmit}
			>
				Attach
			</Button>
		</form>
	);
};
export default FormAttachInvoice;
