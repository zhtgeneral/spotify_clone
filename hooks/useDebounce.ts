import { useEffect, useState } from "react";

/**
 * Takes value T and returns the updated version of it given delay.
 * 500 ms delay is the default
 *
 * @param value
 * @param delay ms
 * @returns T
 */
function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}
export default useDebounce;
// comes from node docs
