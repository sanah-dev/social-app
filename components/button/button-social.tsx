import { RiGithubFill, RiSmartphoneLine } from '@remixicon/react';
import Link from 'next/link';

export default function SocialLogin() {
  return (
    <>
      <div className='w-full h-px bg-neutral-500' />
      <div className='flex flex-col gap-3'>
        <Link
          className='primary-btn flex h-10 items-center justify-center gap-2'
          href='/github/start'
        >
          <RiGithubFill className='size-6' />
          <span>Continue with Github</span>
        </Link>
        {/* <Link
          className='primary-btn flex h-10 items-center justify-center gap-2'
          href='/sms'
        >
          <RiSmartphoneLine className='size-6' />
          <span>Continue with SMS</span>
        </Link> */}
      </div>
    </>
  );
}
