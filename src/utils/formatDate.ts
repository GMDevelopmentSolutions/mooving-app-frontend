export const formatDate = (isoDate: string): string => {
	const date = new Date(isoDate);

	const formattedDate = date.toLocaleDateString("uk-UA", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return `${formattedDate}`;
};
