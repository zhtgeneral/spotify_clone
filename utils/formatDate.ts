export default function formatDate(date: number | null): string | null {
	if (date) {
		return toDateTime(date).toISOString();
	}
	return null;
}

export function toDateTime(seconds: number) {
	var t = new Date("1970-01-01T00:30:00Z");
	t.setSeconds(seconds);
	return t;
};