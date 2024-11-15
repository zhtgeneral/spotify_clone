import { toDateTime } from "@/libs/helpers";

export default function formatDate(date: number | null): string | null {
	if (date) {
		return toDateTime(date).toISOString();
	}
	return null;
}