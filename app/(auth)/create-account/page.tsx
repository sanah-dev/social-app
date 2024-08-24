'use client';

import FormButton from '@/components/button';
import FormInput from '@/components/input';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import {
  RiKey2Line,
  RiLockPasswordLine,
  RiMailLine,
  RiUserLine,
} from '@remixicon/react';
import SocialLogin from '@/components/social-login';

export default function Home() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <>
      <div className='title-box'>
        <h1 className='text-2xl text-rose'>회원가입</h1>
        <h2 className='text-lg'>🙋‍♀️ 안녕하세요. 처음 오셨나요?</h2>
        <p>아래 폼을 입력하면 회원가입이 완료 됩니다.</p>
      </div>
      <form action={dispatch} className='flex flex-col'>
        <FormInput
          name='email'
          type='text'
          placeholder='이메일 입력'
          errors={state?.fieldErrors?.email}
          icon={<RiMailLine size={14} className='absolute left-3' />}
        />

        <FormInput
          name='username'
          type='text'
          placeholder='이름 입력'
          errors={state?.fieldErrors.username}
          icon={<RiUserLine size={16} className='absolute left-3' />}
        />

        <FormInput
          name='password'
          type='password'
          placeholder='비밀번호 입력'
          errors={state?.fieldErrors?.password}
          icon={<RiKey2Line size={16} className='absolute left-3' />}
        />

        <FormInput
          name='confirm_password'
          type='password'
          placeholder='비밀번호 재확인'
          errors={state?.fieldErrors?.confirm_password}
          icon={<RiLockPasswordLine size={16} className='absolute left-3' />}
        />

        <FormButton>가입하기</FormButton>
      </form>
      <SocialLogin />
    </>
  );
}
