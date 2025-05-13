"use client";

import Input from "@/app/components/Input";
import useDebounce from "@/app/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { ChangeEvent, useEffect, useState } from "react";

/**
 * This component handles the search input of the user.
 * 
 * It renders `What do you want to listen to?` by default.
 * 
 * When the user begins typing into the search bar, 
 * it passes the query onto the URL params so the backend can query the results.
 */
export default function SearchInput() {
	const router = useRouter();
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(value, 500);

	useEffect(() => {
		const url = qs.stringifyUrl({
			url: "/search",
			query: {
				title: debouncedValue,
			},
		});
		router.push(url);
	}, [debouncedValue, router]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
	}
	return (
		<Input
			placeholder="What do you want to listen to?"
			value={value}
			onChange={handleChange}
		/>
	);
};
