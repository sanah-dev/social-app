'use client';

import { useState } from 'react';
import Input from './input';
import { RiKey2Line } from '@remixicon/react';
import { useFormState } from 'react-dom';
import { verifyPasswordAction } from '@/app/(home)/(tabs)/users/[id]/edit/action';

export default function _PasswordVerification() {
  const [state, dispatch] = useFormState(verifyPasswordAction, null);
  const [password, setPassword] = useState('');

  return (
    <>
      <div className='title-box'>
        {/* <h1 className='text-2xl text-rose'>회원가입</h1>
        <h2 className='text-lg'>🙋‍♀️ 안녕하세요. 처음 오셨나요?</h2> */}
        <p>프로필 수정을 위해 비밀번호를 입력해주세요.</p>
      </div>

      <form action={dispatch} className='flex flex-col'>
        <Input
          name='password'
          type='password'
          placeholder='비밀번호를 입력해주세요'
          errors={state?.fieldErrors?.password}
          icon={<RiKey2Line size={16} className='absolute left-3' />}
          value={password}
          // onChange={(e) => setPassword(e.target.value)}
          // onChange={(e) => (
          //   console.log(e.target.value), setPassword(e.target.value)
          // )}
        />

        <button type='submit' className='bg-blue-500 text-white p-2'>
          비밀번호 확인
        </button>
      </form>
    </>
  );
}
