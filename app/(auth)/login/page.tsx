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
      <div className='title-box'>
        <div className='flex flex-col items-center justify-center gap-6 w-full h-80 pt-10'>
          <Image
            src={VisualImage}
            alt=''
            width={360}
            height={270}
            className='w-full object-contain size-36'
          />
          <h1 className='text-5xl font-brush'>Welcome back!</h1>
        </div>
      </div>

      <section>
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

        <div className='flex items-center justify-center gap-2 py-8 pb-12'>
          <span className='text-zinc-500'>Don't have an account?</span>
          <Link
            href='/create-account'
            className='underline transition hover:text-rose'
          >
            Sign up
          </Link>
        </div>
      </section>
    </>
  );
}
