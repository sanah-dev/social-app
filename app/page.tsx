'use client';

import FormButton from '@/components/form-button';
import FormInput from '@/components/form-input';
import { EnvelopeIcon, KeyIcon, UserIcon } from '@/components/icon';
import { useFormState } from 'react-dom';
import { FormState, handleForm } from './actions';
import { FormMessage } from '@/components/form-message';

export default function Home() {
  const [state, action] = useFormState<FormState, FormData>(handleForm, {});

  return (
    <main className='w-screen h-screen text-center'>
      <section className='flex flex-col justify-center items-center h-full w-2/6 max-lg:w-3/6 max-sm:w-4/6 m-auto gap-4'>
        <h1 className='flex text-4xl text-cyan-400'>🪸 🐳 🦑 🐠 🐙 🦈 🐡</h1>

        <form action={action} className='flex flex-col w-full'>
          <FormInput
            name='email'
            type='text'
            placeholder='Email'
            errors={state?.errors?.email}
            icon={<EnvelopeIcon className='absolute left-3' />}
          />

          <FormInput
            name='userName'
            type='text'
            placeholder='Username'
            errors={state?.errors?.userName}
            icon={<UserIcon className='absolute left-3' />}
          />

          <FormInput
            name='password'
            type='password'
            placeholder='Password'
            errors={state?.errors?.password}
            icon={<KeyIcon className='absolute left-3' />}
          />

          <FormButton text='Log in'></FormButton>
        </form>

        <FormMessage message={state.message?.[0]} />
      </section>
    </main>
  );
}
