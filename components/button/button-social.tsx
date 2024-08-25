import { RiGithubFill, RiMailLine, RiSmartphoneLine } from '@remixicon/react';
import Link from 'next/link';

export default function SocialLogin() {
  return (
    <>
      <div className='flex flex-col my-4'>
        <div className='flex items-center justify-center w-full my-3 border-t border-t-zinc-300 opacity-70'>
          <span className='inline-block p-2 px-3 -mt-4 bg-white text-xs'>
            or
          </span>
        </div>

        <Link
          className='flex items-center justify-center gap-3 w-full h-12 border border-zinc-400 rounded-md transition *:text-zinc-900 opacity-75 hover:opacity-100'
          href='/github/start'
        >
          <RiGithubFill size={20} />
          <span className='text-xs'>Continue with Github</span>
        </Link>

        {/* <div className='flex gap-2'>
          <Link
            className='flex items-center justify-center gap-3 w-full h-12 border transition hover:bg-rose hover:border-rose hover:text-white'
            href='/github/start'
          >
            <RiGithubFill size={20} />
            <span className='text-xs'>Github</span>
          </Link>

          <button
            disabled
            className='flex items-center justify-center gap-3 w-full h-12 border disabled:bg-zinc-100 disabled:cursor-not-allowed'
          >
            <RiMailLine size={20} />
            <span className='text-xs'>sms</span>
          </button>
        </div> */}
      </div>
    </>
  );
}
