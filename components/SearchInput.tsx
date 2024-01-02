'use client'

import useDebounce from "@/hooks/useDebouncs";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import qs from 'query-string'
import Input from "@/components/Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue
    }

    const url = qs.stringifyUrl({
      url: '/search',
      query: query
    })
    router.push(url);
  }, [debouncedValue, router]);
  return (
    <Input placeholder="What do you want to listen to?" value={value} onChange={(e) => setValue((e.target as HTMLInputElement).value)}/>
  )
}

export default SearchInput