import SearchContent from '@/app/(site)/search/components/SearchContent';
import SearchInput from '@/app/(site)/search/components/SearchInput';
import Header from "@/app/components/Header/Header";
import { Song } from "@/app/types/types";
import { User } from '@supabase/supabase-js';

interface SearchPresenterProps {
  songs: Song[],
  user: User | null
}

export function SearchPresenter({
  songs,
  user
}: SearchPresenterProps) {  
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header user={user} className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
}