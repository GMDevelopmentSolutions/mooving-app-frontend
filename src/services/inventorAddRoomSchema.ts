import { mixed, object, string } from "yup";

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 4 * 1024 * 1024;

function getFileExtension(filename: string) {
	if (!filename) return "";
	const parts = filename.split(".");
	return parts[parts.length - 1];
}
enum SuportedFilesExtensions {
	"png",
	"jpg",
	"jpeg",
}

export const validationSchema = object({
	name: string().required("The field is mandatory"),
	photo: mixed<File>()
		.test({
			message: `Please provide a supported file type ${Object.values(
				SuportedFilesExtensions,
			)
				.filter(value => typeof value === "string")
				.join(", ")}`,
			test: (file, context) => {
				if (!file) return true;
				if (!file.name) return true;
				const isValid = Object.values(SuportedFilesExtensions).includes(
					getFileExtension(file.name),
				);
				if (!isValid) context?.createError();
				return isValid;
			},
		})
		.test({
			message: `File too big, can't exceed ${MAX_FILE_SIZE / 1024 / 1024} MB`,
			test: file => {
				if (!file) return true;
				const isValid = file?.size < MAX_FILE_SIZE;
				return isValid;
			},
		}),
});
