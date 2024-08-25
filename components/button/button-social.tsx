import { RiGithubFill, RiSmartphoneLine } from '@remixicon/react';
import Link from 'next/link';

export default function SocialLogin() {
  return (
    <>
      <div className='flex flex-col my-4 py-4'>
        <div className='flex items-center justify-center w-full my-4 border-t border-t-zinc-300 opacity-70'>
          <span className='inline-block p-2 -mt-4 bg-white text-xs'>또는</span>
        </div>

        <Link
          className='flex items-center justify-center gap-3 w-full p-2 border transition hover:bg-rose hover:border-rose hover:text-white'
          href='/github/start'
        >
          <RiGithubFill className='size-6' />
          <span>Github</span>
        </Link>
      </div>
    </>
  );
}
