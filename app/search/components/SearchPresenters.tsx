import { Song } from "@/types";
import SearchContent from '@/app/search/components/SearchContent';
import Header from "@/components/Header/Header";
import SearchInput from '@/app/search/components/SearchInput';

interface SearchPresenterProps {
  songs: Song[]
}

export function SearchPresenter({
  songs
}: SearchPresenterProps) {  
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
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