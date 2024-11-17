export function getURL() {
	let url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
	url = url.includes("http") ? url : `https://${url}`;
	return url.charAt(url.length - 1) === "/" ? url : `${url}/`;
};