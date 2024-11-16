import { useEffect, useState } from "react";

/**
 * This hook takes a value T and limits the frequency of updates.
 * 
 * The frequency of updates is set as `delay` or 500 ms by default.
 *
 * @param delay frequency of updates in ms
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
