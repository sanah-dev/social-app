'use client';

import { validateSearchKeyword } from '@/app/(home)/(tabs)/search/action';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Input from '../common/input';
import { RiSearchLine } from '@remixicon/react';

interface SearchInputProps {
  // 부모 컴포넌트로 검색 값을 전달할 콜백 함수
  onSearch: (searchValue: string) => void;
}

function SearchInputForm({ onSearch }: SearchInputProps) {
  const [state, dispatch] = useFormState(validateSearchKeyword, null);
  const [searchValue, setSearchValue] = useState('');
  const params = useParams();

  useEffect(() => {
    setSearchValue('');
    onSearch(searchValue);
  }, [params, onSearch]);

  return (
    <>
      <form action={dispatch} className='flex'>
        <Input
          type='text'
          name='search'
          placeholder='트윗을 검색해보세요.'
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          icon={<RiSearchLine size={20} />}
        />
        <button className=''>검색</button>
      </form>

      {state?.fieldErrors.search && (
        <p className='text-red-500 text-xs'>* {state?.fieldErrors.search}</p>
      )}
    </>
  );
}

export default function SearchInput() {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (search.trim() === '') {
      return;
    }

    // 검색어가 입력 후 페이지이동
    router.push(`/search/result?search=${encodeURIComponent(search)}`);
  }, [search, router]);

  return (
    <>
      <SearchInputForm onSearch={setSearch} />
    </>
  );
}
