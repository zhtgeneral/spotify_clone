"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import Input from "@/components/Input";

/**
  Component that renders `What do you want to listen to?` 
	
	Takes user input and puts the param onto the URL
*/
const SearchInput = () => {
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
	return (
		<Input
			placeholder="What do you want to listen to?"
			value={value}
			onChange={(e) => setValue((e.target as HTMLInputElement).value)}
		/>
	);
};

export default SearchInput;
