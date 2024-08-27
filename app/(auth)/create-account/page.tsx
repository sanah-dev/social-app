'use client';

import FormButton from '@/components/button/button';
import FormInput from '@/components/common/input';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import {
  RiKey2Line,
  RiLockPasswordLine,
  RiMailLine,
  RiUserLine,
} from '@remixicon/react';
import SocialLogin from '@/components/button/button-social';
import Image from 'next/image';
import VisualImage from '@/public/auth/create-account.png';
import Link from 'next/link';

export default function Home() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <>
      <section className='my-5'>
        <div className='flex flex-col items-center mb-5'>
          <Image src={VisualImage} alt='' className='object-contain size-20' />
          <h1 className='text-center text-5xl font-brush'>Create an Account</h1>
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
            text='Username'
            name='username'
            type='text'
            placeholder='Enter your username'
            errors={state?.fieldErrors.username}
            icon={
              <RiUserLine size={16} className='absolute left-3 text-zinc-400' />
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

          <FormInput
            text='Confirm Password'
            name='confirm_password'
            type='password'
            placeholder='Enter your confirm password'
            errors={state?.fieldErrors?.confirm_password}
            icon={
              <RiLockPasswordLine
                size={16}
                className='absolute left-3 text-zinc-400'
              />
            }
          />

          <FormButton>Sign up</FormButton>
        </form>
        <SocialLogin />
      </section>

      <div className='flex items-center justify-center gap-2 py-5'>
        <span className='text-zinc-500'>Already have an account?</span>
        <Link href='/login' className='underline transition hover:text-rose'>
          Log in
        </Link>
      </div>
    </>
  );
}
