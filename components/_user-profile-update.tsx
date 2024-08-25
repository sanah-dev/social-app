'use client';

import { useState } from 'react';
import Input from './common/input';
import { RiUserLine } from '@remixicon/react';

export default function _ProfileUpdate({
  action,
}: {
  action: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState('');

  const dispatch = (e: React.FormEvent) => {
    e.preventDefault();
    action(nickname); // 부모 컴포넌트의 닉네임 수정 함수 호출
  };

  return (
    <>
      <form onSubmit={dispatch} className='flex flex-col'>
        <label className='mb-2'>
          새 닉네임:
          <input
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className='border p-2'
            required
          />
        </label>

        <Input
          name='username'
          type='text'
          placeholder='이름 입력'
          // errors={state?.fieldErrors.username}
          errors={[]}
          icon={<RiUserLine size={16} className='absolute left-3' />}
        />

        <button type='submit' className='bg-blue-500 text-white p-2'>
          닉네임 수정
        </button>
      </form>
    </>
  );
}
