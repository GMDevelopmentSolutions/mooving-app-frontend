export default function getFileExtension(filename: string) {
	if (!filename) return "";
	const parts = filename.split(".");
	return parts[parts.length - 1];
}
