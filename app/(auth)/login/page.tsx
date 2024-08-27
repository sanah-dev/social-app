'use client';

import FormButton from '@/components/button/button';
import FormInput from '@/components/common/input';
import { useFormState } from 'react-dom';
import { logIn } from './actions';
import { RiKey2Line, RiMailLine } from '@remixicon/react';
import SocialLogin from '@/components/button/button-social';
import Link from 'next/link';
import Image from 'next/image';
import VisualImage from '@/public/auth/login.png';

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);
  return (
    <>
      <section className='my-5'>
        <div className='flex flex-col items-center mb-5'>
          <Image src={VisualImage} alt='' className='object-contain size-20' />
          <h1 className='text-center text-5xl font-brush'>Welcome back!</h1>
        </div>

        <form action={dispatch} className='flex flex-col'>
          <FormInput
            text='Email Address'
            name='email'
            type='text'
            placeholder='Enter your email'
            errors={state?.fieldErrors?.email}
            icon={
              <RiMailLine size={14} className='absolute left-3 text-zinc-400' />
            }
          />

          <FormInput
            text='Password'
            name='password'
            type='password'
            placeholder='Enter your password'
            errors={state?.fieldErrors?.password}
            icon={
              <RiKey2Line size={16} className='absolute left-3 text-zinc-400' />
            }
          />

          <FormButton>Log in</FormButton>
        </form>

        <SocialLogin />
      </section>

      <div className='flex items-center justify-center gap-2 py-5'>
        <span className='text-zinc-500'>Don&apos;t have an account?</span>
        <Link
          href='/create-account'
          className='underline transition hover:text-rose'
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
