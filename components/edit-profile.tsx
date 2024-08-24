'use client';

import { useState } from 'react';
import Input from './input';
import { RiKey2Line, RiMailLine, RiUserLine } from '@remixicon/react';

export default function ProfileUpdate({
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
        <Input
          name='username'
          type='text'
          placeholder='닉네임 수정'
          // errors={state?.fieldErrors.username}
          errors={[]}
          icon={<RiUserLine size={16} className='absolute left-3' />}
        />

        <Input
          name='email'
          type='email'
          placeholder='이메일 수정'
          // errors={state?.fieldErrors.username}
          errors={[]}
          icon={<RiMailLine size={16} className='absolute left-3' />}
        />

        <Input
          name='password'
          type='password'
          placeholder='비밀번호 입력'
          // errors={state?.fieldErrors?.password}
          errors={[]}
          icon={<RiKey2Line size={16} className='absolute left-3' />}
        />

        <button type='submit' className='bg-blue-500 text-white p-2'>
          저장하기
        </button>
      </form>
    </>
  );
}
