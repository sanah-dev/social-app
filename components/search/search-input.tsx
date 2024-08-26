'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Input from '../common/input';
import { RiSearchLine } from '@remixicon/react';
import Button from '../button/button';
import { validateSearchKeyword } from '@/lib/validate';

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
      <form action={dispatch} className='flex w-full'>
        <Input
          type='text'
          name='search'
          placeholder='트윗을 검색해보세요.'
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className='w-full'
          icon={<RiSearchLine size={16} className='absolute left-3' />}
        />
        <Button className='w-20'>검색</Button>
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
