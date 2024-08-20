'use client';

import FormButton from '@/components/button';
import FormInput from '@/components/input';
import { useFormState } from 'react-dom';
import { logIn } from './actions';
import { EnvelopeIcon, KeyIcon } from '@/components/icon';
import ButtonPrev from '@/components/button-prev';

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);
  return (
    <main>
      <section className='bg-dark'>
        <div className='content'>
          <div className='title-box'>
            <ButtonPrev />
            <h1 className='text-2xl text-rose'>로그인</h1>
            <h2 className='text-lg'>👋 다시 만나서 반가워요</h2>
            <p>가입하신 이메일과 비밀번호를 입력해주세요.</p>
          </div>

          <form action={dispatch} className='flex flex-col'>
            <FormInput
              name='email'
              type='text'
              placeholder='이메일 입력'
              errors={state?.fieldErrors?.email}
              icon={<EnvelopeIcon className='absolute left-3' />}
            />

            <FormInput
              name='password'
              type='password'
              placeholder='비밀번호 입력'
              errors={state?.fieldErrors?.password}
              icon={<KeyIcon className='absolute left-3' />}
            />

            <FormButton>로그인</FormButton>
          </form>
        </div>
      </section>
    </main>
  );
}
