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
      <form action={dispatch} className='flex w-full p-4 pb-0'>
        <Input
          type='text'
          name='keyword'
          placeholder='트윗을 검색해보세요.'
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className='w-full'
          icon={<RiSearchLine size={16} className='absolute left-3' />}
        />
        <Button className='w-14 mt-1 ml-1 p-2'>검색</Button>
      </form>
      {state?.fieldErrors.keyword && (
        <p className='px-4 text-red-500 text-xs'>
          * {state?.fieldErrors.keyword}
        </p>
      )}
    </>
  );
}

export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (keyword.trim() === '') {
      return;
    }

    // 검색어 입력 후 페이지이동
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  }, [keyword, router]);

  return (
    <>
      <SearchInputForm onSearch={setKeyword} />
    </>
  );
}
