'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { EnvelopeIcon, KeyIcon, UserIcon } from '@/components/icon';
import { useFormState } from 'react-dom';
import { FormState, handleForm } from './actions';
import {
  FormErrorMessage,
  FormSuccessMessage,
} from '@/components/form-message';

const initialState: FormState = {
  errors: [],
  message: '',
};

export default function Home() {
  const [state, action] = useFormState<FormState, FormData>(
    handleForm,
    initialState
  );

  return (
    <main className='w-screen h-screen text-center'>
      <section className='flex flex-col justify-center items-center h-full w-2/6 max-lg:w-3/6 max-sm:w-4/6 m-auto gap-4'>
        <h1 className='flex text-4xl text-cyan-400'>
          <span>🪸 🐳 🦑 🐠 🐙 🦈 🐡</span>
        </h1>

        <form action={action} className='flex flex-col gap-4 w-full'>
          <FormInput
            name='email'
            type='text'
            placeholder='Email'
            // required={true}
            errors={[]}
            icon={<EnvelopeIcon className='form-icon' />}
          />

          <FormInput
            name='userName'
            type='text'
            placeholder='Username'
            // required={true}
            errors={[]}
            icon={<UserIcon className='form-icon' />}
          />

          <FormInput
            name='password'
            type='password'
            placeholder='Password'
            // required={true}
            errors={state?.errors ?? []}
            icon={<KeyIcon className='form-icon' />}
          />

          <FormErrorMessage errors={state.errors} />

          <FormButton text='Log in'></FormButton>
        </form>
        <FormSuccessMessage message={state.message} />
      </section>
    </main>
  );
}
